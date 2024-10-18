import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Categories({categories}) {
  return (
    <div className="container">
      <h1>Categorii</h1>
      <ul className="categories">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/quiz/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps() {
  // Calea către fișierul JSON
  const filePath = path.join(process.cwd(), 'public', 'questions.json');
  
  // Citirea fișierului JSON
  const jsonData = await fs.promises.readFile(filePath, 'utf-8');
  
  // Parsarea datelor
  const data = JSON.parse(jsonData);

  return {
    props: {
      categories: data.categories // Transmiterea categoriilor către componentă
    }
  };
}