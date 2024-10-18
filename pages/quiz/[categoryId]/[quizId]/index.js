// pages/quiz/[categoryId]/[quizId]/index.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Quiz = () => {
    const router = useRouter();
    const { categoryId, quizId } = router.query;

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (categoryId && quizId) {
            const fetchQuiz = async () => {
                try {
                    const response = await fetch('/api/questions');
                    const data = await response.json();
                    const quizzes = data.quizzes;
                    // Găsește quiz-ul pe baza quizId
                    const quizData = quizzes.find(q => q.id === parseInt(quizId));
                    if (!quizData) {
                        throw new Error('Quiz-ul nu a fost găsit.');
                    }
                    setQuiz(quizData);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchQuiz();
        }
    }, [categoryId, quizId]);

    if (loading) return <h1>Încărcare...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <div className="container">
            <h1>{quiz.name}</h1>
            <p>Întrebările vor apărea aici.</p>
            <Link href={`/quiz/${categoryId}/${quizId}/question/1`}>
                Începe Quiz-ul
            </Link>
        </div>
    );
};

export default Quiz;
