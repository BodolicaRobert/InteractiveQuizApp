import { useState } from 'react';

export default function AddQuestion() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']); // Două câmpuri pentru opțiuni
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']); // Adaugă un câmp gol pentru o nouă opțiune
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuestion = {
            text: question,
            options,
            correctAnswer,
        };

        // Simulăm salvarea în localStorage
        const existingQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        existingQuestions.push(newQuestion);
        localStorage.setItem('questions', JSON.stringify(existingQuestions));

        // Resetăm formularul
        setQuestion('');
        setOptions(['', '']);
        setCorrectAnswer('');
        alert('Întrebarea a fost adăugată cu succes!');
    };

    return (
        <div className="container">
            <h1>Adaugă o întrebare nouă</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Întrebare:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Opțiuni de răspuns:</label>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Opțiunea ${index + 1}`}
                            required
                        />
                    ))}
                    <button type="button" onClick={handleAddOption}>
                        Adaugă o opțiune
                    </button>
                </div>
                <div>
                    <label>Răspuns corect:</label>
                    <input
                        type="text"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Adaugă Întrebarea</button>
            </form>
        </div>
    );
}
