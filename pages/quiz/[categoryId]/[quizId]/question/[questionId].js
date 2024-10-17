import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

import fs from "fs";
import path from "path";

const Question = ({ quiz, question }) => {
  const router = useRouter();
  const { categoryId, quizId, questionId } = router.query;

  // State pentru răspunsul selectat și feedback
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0); // Punctajul utilizatorului
  const [isAnswered, setIsAnswered] = useState(false); // Dacă a răspuns la întrebare
  if (!quiz || !question) {
    return <h1>Întrebarea nu a fost găsită.</h1>;
  }

  useEffect(() => {
    setIsAnswered(false);
    setFeedback("");
    setSelectedOption("");
  }, [questionId]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Funcție pentru trimiterea răspunsului și afișarea feedback-ului
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isAnswered) return; // Nu permite trimiterea de mai multe ori la aceeași întrebare

    setIsAnswered(true); // Marchează întrebarea ca fiind răspunsă

    if (selectedOption === question.correctAnswer) {
      setFeedback("Corect!");
      setScore((prevScore) => prevScore + 1); // Actualizează punctajul
    } else {
      setFeedback(`Greșit! Răspunsul corect este: ${question.correctAnswer}`);
    }
  };

  // Funcție pentru navigarea la următoarea întrebare
  const handleNextQuestion = () => {
    const nextQuestionId = parseInt(questionId) + 1;
    if (quiz.questions.some((q) => q.id === nextQuestionId)) {
      router.push(`/quiz/${categoryId}/${quizId}/question/${nextQuestionId}`);    
    } else {
      router.push({
        pathname: `/quiz/${categoryId}/${quizId}/results`,
        query: { score, total: quiz.questions.length },
      });
    }
  };

  return (
    <div className="container">
      <h1>{question.text}</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {question.options.map((option) => (
            <li key={option}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  disabled={isAnswered}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        {!isAnswered && <button type="submit">Trimite Răspunsul</button>}
      </form>
      {/* Afișează feedback-ul */}
      {feedback && <p>{feedback}</p>}

      {/* Butonul pentru următoarea întrebare */}
      {isAnswered && (
        <button onClick={handleNextQuestion}>Următoarea Întrebare</button>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { quizId, questionId } = context.params;

  // Calea către fișierul JSON
  const filePath = path.join(process.cwd(), "public", "questions.json");

  // Citirea fișierului JSON
  const jsonData = await fs.promises.readFile(filePath, "utf-8");

  // Parsarea datelor
  const data = JSON.parse(jsonData);

  // Găsim quiz-ul specific
  const quiz = data.quizzes.find((q) => q.id.toString() === quizId);

  if (!quiz) {
    return {
      notFound: true,
    };
  }

  // Găsim întrebarea specifică din quiz
  const question = quiz.questions.find((q) => q.id.toString() === questionId);

  if (!question) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      quiz,
      question,
    },
  };
}

export default Question;
