import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import JSONdata from "./question.json";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const changeQuestion = (isCorrect) => {
    if (isCorrect === "true") {
      setScore(score + 1);
    }

    const nexQuestion = currentQuestion + 1;
    if (nexQuestion < JSONdata.length) {
      setCurrentQuestion(nexQuestion);
    } else {
      setShowScore(true);
    }
  };

  const startAgain = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
  };
  useEffect(() => {
    const retrieve = async () => {
      const data = await axios.get("https://opentdb.com/api.php?amount=10");
      console.log(data);
    };
    retrieve();
  }, []);

  return (
    <div className="App">
      {showScore ? (
        <div className="score">
          <h1>
            Score  {score} of {JSONdata.length}
          </h1>
          <button onClick={startAgain}>start again</button>
        </div>
      ) : (
        <div className="box">
          <h2>
            Question {currentQuestion + 1}/<span>{JSONdata.length}</span>
          </h2>
          <h3 className="quest">{JSONdata[currentQuestion].questionText}</h3>
          <div className="btn-grid">
            {JSONdata[currentQuestion].answerOptions.map((value) => (
              <button onClick={() => changeQuestion(value.isCorrect)}>
                {value.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
