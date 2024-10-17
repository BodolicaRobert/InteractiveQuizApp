import { useRouter } from 'next/router';
import Link from 'next/link';
//import { categories, quizzes } from '../../../data'; 
import fs from 'fs';
import path from 'path';

    export default function QuizCategory({ quizzes, categoryName }) {
    return (
        <div className="container">
            <h1>Quiz-uri pentru categoria: {categoryName}</h1>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>
                            <Link href={`/quiz/${quiz.categoryId}/${quiz.id}`} className="link">
                                {quiz.name}
                            </Link>
                    </li>
            ))}
            </ul>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { categoryId } = context.params;
  
    // Calea către fișierul JSON
    const filePath = path.join(process.cwd(), 'public', 'questions.json');
    
    // Citirea fișierului JSON
    const jsonData = await fs.promises.readFile(filePath, 'utf-8');
    
    // Parsarea datelor
    const data = JSON.parse(jsonData);
    
    // Filtrăm quiz-urile pentru categoria dată
    const quizzes = data.quizzes.filter((quiz) => quiz.categoryId.toString() === categoryId);
    
    // Căutăm numele categoriei
    const category = data.categories.find((cat) => cat.id.toString() === categoryId);
  
    if (!category) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        quizzes,
        categoryName: category.name
      }
    };
  }