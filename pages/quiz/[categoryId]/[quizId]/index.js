import { useRouter } from 'next/router';
import Link from 'next/link';
import { quizzes } from '../../../../data'; // Verifică calea de import

const Quiz = () => {
    const router = useRouter();
    const { categoryId, quizId } = router.query;

    // Găsește quiz-ul pe baza quizId
    const quiz = quizzes.find(q => q.id === parseInt(quizId));

    if (!quiz) {
        return <h1>Quiz-ul nu a fost găsit.</h1>;
    }

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
