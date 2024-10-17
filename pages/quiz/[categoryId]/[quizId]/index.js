import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
const Quiz = ({quiz}) => {
    const router = useRouter();
    const { categoryId, quizId } = router.query;
    console.log(quiz);
    // Găsește quiz-ul pe baza quizId
    //const quizz = quizzes.find(q => q.id === parseInt(quizId));

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
export async function getServerSideProps(context) {
    const { quizId } = context.params;

    // Calea către fișierul JSON
    const filePath = path.join(process.cwd(), 'public', 'questions.json');
    
    // Citirea fișierului JSON
    const jsonData = await fs.promises.readFile(filePath, 'utf-8');
    
    // Parsarea datelor
    const data = JSON.parse(jsonData);
    
    // Găsim quiz-ul specific
    const quiz = data.quizzes.find((q) => q.id.toString() === quizId);

    if (!quiz) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            quiz
        }
    };
}
export default Quiz;

