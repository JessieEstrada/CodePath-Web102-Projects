import { useState, useEffect } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";
const App = () => {
  const [cards, setCards] = useState([
    {
      question: "Start!",
      answer: "Press the right arrow to start the flashcards :)",
    },
    {
      question: "Which team has a blue cross in the center?",
      answer: "Cruz-Azul",
      image: "src/Images/Cruz-Azul-Logo.png",
    },
    {
      question: "What is the nickname for Atlas F.C?",
      answer: "Rojinegros",
      image: "src/Images/Atlas-Nickname.png",
    },
    {
      question: "How many times is this tournamnet played in a year?",
      answer: "2",
      image: "src/Images/liga-mx-logo.png",
    },
    {
      question: "What teams play in the Clasico Joven?",
      answer: "Cruz-Azul VS America",
      image: "src/Images/crz-vs-america.png",
    },
    {
      question: "Which team plays Home from Estadio Akron?",
      answer: "Las Chivas",
      image: "src/Images/chivas-logo.png",
    },
    {
      question: "What is the term for playoff stage in this league?",
      answer: "Liguilla",
      image: "src/Images/liguilla.jpg",
    },
    {
      question: "What is the most popular nickname for team Cruz-Azul?",
      answer: "La Maquina",
      image: "src/Images/la-maquina-crz.jpg",
    },
    {
      question: "Which team has the most Liga MX Trophy wins?",
      answer: "Club America",
      image: "src/Images/america-logo.png",
    },
    {
      question: "Which stadium is the most historic in the league?",
      answer: "Estadio Azteca",
      image: "src/Images/estadio-azteca.jpg",
    },
    { question: "Who is Club Tigres' Mascot?", answer: "A Tiger", image: "src/Images/tigres-mascot.jpg" },
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState(""); // State for user input
  const [seenCards, setSeenCards] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Function to shuffle the cards array
  const randCards = () => {
    const randomCards = [...cards];

    // Remove the first card seperately
    const firstCard = randomCards.shift();

    // Shuffle all cards now
    for (let i = randomCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomCards[i], randomCards[j]] = [randomCards[j], randomCards[i]];
    }

    // Re-add the first card back to the list
    randomCards.unshift(firstCard);

    //We return our list
    return randomCards;
  };

  // Shuffle the cards when the component mounts
  useEffect(() => {
    setCards(randCards());
  }, []);

  const handleSwitchCard = () => {
    if (currentCardIndex === cards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    setIsFlipped(false);

    // Let's add this card to a list of cards we have already passed
    setSeenCards([...seenCards, cards[currentCardIndex]]);
    setIsCorrect(null);
    setUserInput("");
  };

  const handleSwitchCardBack = () => {
    if (seenCards.length > 0) {
      const previousCard = seenCards.pop();
      const previousCardIndex = cards.findIndex((card) => card.question === previousCard.question);
      // Let's go back to our previous card
      setCurrentCardIndex(previousCardIndex);
      setIsFlipped(false);
      setSeenCards([...seenCards]);
      setIsCorrect(null);
      setUserInput("");
    }
  };

  const checkAnswer = () => {
    const correctAnswer = cards[currentCardIndex].answer;
    if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
      setIsCorrect(true); // User's answer is correct
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsCorrect(false); // User's answer is incorrect
    }
  };

  return (
    <div className="App">
      <div className="Contents">
        <h2>⚽️🇲🇽 The Liga MX Ultimate Quiz! 🇲🇽⚽️</h2>
        <h4>
          How knowledgeable are you in the highly competitive Mexican Soccer League? Test your skills here and find out how well you
          know this soccer league!
        </h4>
        <h5>Total Cards: {cards.length - 1},</h5>
        <h5>Correct Answers: {correctAnswers}</h5>
        <br></br>
        <div className="card-section">
          <Flashcard
            question={cards[currentCardIndex].question}
            answer={cards[currentCardIndex].answer}
            image={cards[currentCardIndex].image}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
        </div>
        <div className="guess-section">
          <p className="guess-instructions">Guess the answer here:</p>
          <input
            type="text"
            name="answer"
            placeholder="Place your answer here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className={isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : ""}
          ></input>
          <button type="submit" className="submit-guess-button" disabled={currentCardIndex === 0} onClick={checkAnswer}>
            Submit Guess
          </button>
        </div>
        <div className="card-actions">
          <button type="back" className="previousCard" disabled="" onClick={handleSwitchCardBack}>
            ⭠
          </button>
          <button type="next" className="nextCard" onClick={handleSwitchCard}>
            ⭢
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
