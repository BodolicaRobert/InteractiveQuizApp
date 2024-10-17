import { useRouter } from 'next/router';
import { useState } from 'react';
import { quizzes } from '../../../../../data'; 

const Question = () => {
    const router = useRouter();
    const { categoryId, quizId, questionId } = router.query;

    // Găsim quiz-ul și întrebarea
    const quiz = quizzes.find(q => q.id === parseInt(quizId));
    const question = quiz?.questions.find(q => q.id === parseInt(questionId));

    // State pentru a ține evidența răspunsului selectat
    const [selectedOption, setSelectedOption] = useState('');

    if (!quiz || !question) {
        return <h1>Întrebarea nu a fost găsită.</h1>;
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const nextQuestionId = parseInt(questionId) + 1;
        if (quiz.questions.some(q => q.id === nextQuestionId)) {
            router.push(`/quiz/${categoryId}/${quizId}/question/${nextQuestionId}`);
        } else {           
            alert("Quiz-ul s-a terminat!");
            router.push(`/quiz/${categoryId}/${quizId}`); // Navighează înapoi la pagina quiz-ului
        }
    };

    return (
        <div>
            <h1>{question.text}</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {question.options.map(option => (
                        <li key={option}>
                            <label>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={handleOptionChange}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
                <button type="submit">Trimite Răspunsul</button>
            </form>
        </div>
    );
};

export default Question;
