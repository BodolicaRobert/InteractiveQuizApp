import { useRouter } from 'next/router';
import Link from 'next/link';

const Results = () => {
    const router = useRouter();
    const { score, total } = router.query;

    const getFeedbackMessage = () => {
        const percentage = (score / total) * 100;
        if (percentage === 100) {
            return "Felicitări! Ai obținut toate răspunsurile corecte!";
        } else if (percentage >= 70) {
            return "Good job! Ai obținut un punctaj bun.";
        } else {
            return "Mai trebuie puțin antrenament. Încearcă din nou!";
        }
    };

    return (
        <div className="results-container">
            <h1>Rezultatele Quiz-ului</h1>
            <p>Total întrebări: {total}</p>
            <p>Răspunsuri corecte: {score}</p>
            <p>{getFeedbackMessage()}</p>
            <Link href="/categories">
                <button>Înapoi la Categorii</button>
            </Link>
        </div>
    );
};

export default Results;
