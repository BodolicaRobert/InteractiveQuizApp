import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Bine ai venit la Quiz App!</h1>
      <p>Selectează o categorie pentru a începe:</p>
      <Link href="/categories" className="link">
        Vezi Categorii
      </Link>
    </div>
  );
}
