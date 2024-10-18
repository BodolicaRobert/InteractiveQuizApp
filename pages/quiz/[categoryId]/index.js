import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function QuizCategory() {
    const router = useRouter();
    const { categoryId } = router.query;

    const [quizzes, setQuizzes] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

      // State pentru formularul de adăugare a întrebărilor
      const [newQuestion, setNewQuestion] = useState('');
      const [newOptions, setNewOptions] = useState(['', '', '']); // 3 opțiuni
      const [correctAnswer, setCorrectAnswer] = useState('');

      // State pentru afișarea formularului
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('/api/questions'); // API-ul nostru
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Filtrăm quiz-urile pentru categoria dată
                const filteredQuizzes = data.quizzes.filter(quiz => quiz.categoryId.toString() === categoryId);
                setQuizzes(filteredQuizzes);

                // Căutăm numele categoriei
                const category = data.categories.find(cat => cat.id.toString() === categoryId);
                if (category) {
                    setCategoryName(category.name);
                } else {
                    throw new Error('Categoria nu a fost găsită.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchQuizzes();
        }
    }, [categoryId]);

    const handleAddQuestion = (e) => {
      e.preventDefault();

      // Validare simplă
      if (!newQuestion || !correctAnswer || newOptions.some(option => option === '')) {
          alert('Te rugăm să completezi toate câmpurile.');
          return;
      }

      // Simulăm salvarea întrebării în local storage
      const questionData = {
          id: Date.now(), // generăm un id unic (într-un mediu real, ar trebui să folosești o metodă mai bună)
          text: newQuestion,
          options: newOptions,
          correctAnswer: correctAnswer,
      };

      // Aici ai putea să salvezi întrebarea în local storage, de exemplu
      const currentQuestions = JSON.parse(localStorage.getItem('questions')) || [];
      currentQuestions.push(questionData);
      localStorage.setItem('questions', JSON.stringify(currentQuestions));

      // Resetăm formularul
      setNewQuestion('');
      setNewOptions(['', '', '']);
      setCorrectAnswer('');
      alert('Întrebarea a fost adăugată cu succes!');
      setShowForm(false);
  };

  const handleOptionChange = (index, value) => {
      const updatedOptions = [...newOptions];
      updatedOptions[index] = value;
      setNewOptions(updatedOptions);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica pentru a adăuga întrebarea
    console.log({ newQuestion, newOptions, correctAnswer });
    setShowForm(false); // Ascunde formularul după submit
};
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h1>Quiz-uri pentru categoria: {categoryName}</h1>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz.id}>
                        <Link href={`/quiz/${quiz.categoryId}/${quiz.id}`}>
                            {quiz.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <button className="add-question-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Ascunde Formularul' : 'Adaugă o întrebare nouă'}
            </button>

            {showForm && (
                <form onSubmit={handleAddQuestion} className="form">
                    <h3>Adaugă o întrebare nouă</h3>
                    <label>
                        Întrebare:
                        <input
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Opțiunea 1:
                        <input
                            type="text"
                            value={newOptions[0]}
                            onChange={(e) => setNewOptions([e.target.value, newOptions[1], newOptions[2]])}
                            required
                        />
                    </label>
                    <label>
                        Opțiunea 2:
                        <input
                            type="text"
                            value={newOptions[1]}
                            onChange={(e) => setNewOptions([newOptions[0], e.target.value, newOptions[2]])}
                            required
                        />
                    </label>
                    <label>
                        Opțiunea 3:
                        <input
                            type="text"
                            value={newOptions[2]}
                            onChange={(e) => setNewOptions([newOptions[0], newOptions[1], e.target.value])}
                            required
                        />
                    </label>
                    <label>
                        Răspuns corect:
                        <input
                            type="text"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Adaugă Întrebarea</button>
                </form>
            )}
        </div>
    );
}
