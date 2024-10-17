// data.js
export const categories = [
    { id: 1, name: 'Fitness' },
    { id: 2, name: 'Fotbal' },
    { id: 3, name: 'JavaScript' }
  ];
  
  export const quizzes = [
    {
      id: 1,
      categoryId: 1, // Fitness
      name: 'Fitness Quiz',
      questions: [
        {
          id: 1,
          text: 'Câte minute de exercițiu fizic sunt recomandate pe zi?',
          options: ['30 minute', '60 minute', '90 minute'],
          correctAnswer: '30 minute'
        },
        {
          id: 2,
          text: 'Care este exercițiul de bază pentru abdomen?',
          options: ['Genuflexiuni', 'Flotări', 'Abdomene'],
          correctAnswer: 'Abdomene'
        },
        {
          id: 3,
          text: 'Cât de des ar trebui să faci exerciții cardio?',
          options: ['De 2 ori pe săptămână', 'De 5 ori pe săptămână', 'Zilnic'],
          correctAnswer: 'De 5 ori pe săptămână'
        }
      ]
    },
    {
      id: 2,
      categoryId: 2, // Fotbal
      name: 'Fotbal Quiz',
      questions: [
        {
          id: 1,
          text: 'Câți jucători sunt într-o echipă de fotbal?',
          options: ['10', '11', '12'],
          correctAnswer: '11'
        },
        {
          id: 2,
          text: 'Cine a câștigat Cupa Mondială din 2018?',
          options: ['Brazilia', 'Germania', 'Franța'],
          correctAnswer: 'Franța'
        },
        {
          id: 3,
          text: 'Câte reprize are un meci de fotbal?',
          options: ['1', '2', '3'],
          correctAnswer: '2'
        }
      ]
    },
    {
      id: 3,
      categoryId: 3, // JavaScript
      name: 'JavaScript Quiz',
      questions: [
        {
          id: 1,
          text: 'Ce este "let" în JavaScript?',
          options: ['O funcție', 'Un tip de variabilă', 'O metodă'],
          correctAnswer: 'Un tip de variabilă'
        },
        {
          id: 2,
          text: 'Ce simbol este folosit pentru a defini un array?',
          options: ['{}', '[]', '()'],
          correctAnswer: '[]'
        },
        {
          id: 3,
          text: 'Cum declari o funcție în JavaScript?',
          options: [
            'function myFunc() {}',
            'var myFunc = () => {}',
            'Ambele variante sunt corecte'
          ],
          correctAnswer: 'Ambele variante sunt corecte'
        }
      ]
    }
  ];
  