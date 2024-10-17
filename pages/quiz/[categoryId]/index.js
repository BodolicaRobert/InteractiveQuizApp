import { useRouter } from 'next/router';
import Link from 'next/link';
import { categories, quizzes } from '../../../data'; 

const QuizList = () => {
    const router = useRouter();
    const { categoryId } = router.query;

    // Găsește categoria pe baza categoryId
    const category = categories.find(cat => cat.id === parseInt(categoryId));

    // Găsește quiz-urile asociate categoriei
    const filteredQuizzes = quizzes.filter(quiz => quiz.categoryId === parseInt(categoryId));

    if (!category) {
        return <h1>Categoria nu a fost găsită.</h1>;
    }

    return (
        <div className="container">
            <h1>Quiz-uri pentru categoria: {category.name}</h1>
            <ul>
                {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map(quiz => (
                        <li key={quiz.id}>
                            
                            <Link href={`/quiz/${categoryId}/${quiz.id}`} className="link">
                                {quiz.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>Nu există quiz-uri pentru această categorie.</li>
                )}
            </ul>
        </div>
    );
};

export default QuizList;
