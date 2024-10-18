import { useRouter } from "next/router";
import { useState, useEffect } from 'react';



const Question = ({ totalQuestions }) => {
  const router = useRouter();
  const { categoryId, quizId, questionId } = router.query;

  const [quiz, setQuiz] = useState(null);
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        const preventBackNavigation = () => {
          window.history.pushState(null, null, window.location.href); // Setăm URL-ul curent din nou
        };
      
        const handlePopState = () => {
          router.replace(`/quiz/${categoryId}/${quizId}/question/${questionId}`);
        };
      
        // Inițial setăm istoria și blocăm navigarea înapoi
        window.history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', handlePopState);  // Împiedicăm schimbarea URL-ului
      
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, [categoryId, quizId, questionId]);
      
    useEffect(() => {
        
        if (quizId) {
            const fetchQuiz = async () => {
                try {
                    const response = await fetch('/api/questions');
                    const data = await response.json();
                    console.log(data);
                    const quizzes = data.quizzes;
                    // Găsește quiz-ul pe baza quizId
                    const quizData = quizzes.find(q => q.id === parseInt(quizId));
                    if (!quizData) {
                        throw new Error('Quiz-ul nu a fost găsit.');
                    }
                    setQuiz(quizData);

                    // Găsește întrebarea pe baza questionId
                    const questionData = quizData.questions.find(q => q.id === parseInt(questionId));
                    setQuestion(questionData);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchQuiz();
        }
    }, [quizId, questionId]);

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
      router.replace(`/quiz/${categoryId}/${quizId}/question/${nextQuestionId}`);    
    } else {
      router.replace({
        pathname: `/quiz/${categoryId}/${quizId}/results`,
        query: { score, total: quiz.questions.length },
      });
    }
  };

  if (loading) return <h1>Încărcare...</h1>;
    if (error) return <h1>{error}</h1>;
    if (!question) return <h1>Întrebarea nu a fost găsită.</h1>;

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


export default Question;
