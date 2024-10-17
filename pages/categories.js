import { categories } from '../data'; 
import Link from 'next/link';
//modificari modul 1
export default function Categories() {
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
