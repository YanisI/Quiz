import React from 'react'
import { useState } from 'react'

const Quiz = ({ question, replay }) => {

  const [actualQuestion, setActualQuestion] = useState(0);
  const [select, setSelect] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  const message = ["Nul","Peut mieux faire","Moyen","Bon score","Parfait! "];

  const isValid = () => {
    let a = question[actualQuestion].correct_answers;
    let answer = Object.keys(a)
      .map(function (key) {
        return a[key];
      });
    let result = [];
    for (let i = 0; i < 6; i++) {
      if (select.includes(i)) {
        result.push('true');
      }
      else {
        result.push('false');
      }
    }
    for (let i = 0; i < 6; i++) {
      console.log(answer[i]);
      console.log(result[i]);
      if (answer[i] !== result[i]) {
        return;
      }
    }
    setScore(score + 1);
  }

  const handleValidate = () => {
    if (select.length > 0) {
      isValid();
      setSelect([])
      if (actualQuestion + 1 < question.length) {
        setActualQuestion(actualQuestion + 1);
      }
      else {
        setShowScore(!showScore);
      }


    }

  }

  const handleClick = (i) => {
    let a = [];
    if (select.includes(i)) {
      let b = [...select]
      a = b.filter(sel => sel !== i)
    }
    else {
      a = [...select, i]
    }
    setSelect(a);
  }
  const handleReplay = () => {
    replay();
    setActualQuestion(0);
    setScore(0)
    setShowScore(false);

  }

  return (
    <div className='quiz'>
      <div className="container">
        {!showScore &&
          <>
            <div className="questionMark">
              Question : {actualQuestion + 1} / {question.length}
            </div>
            <div className="question">
              {question[actualQuestion].question}
            </div>
            <div className="reponses">
              {Object.values(question[actualQuestion].answers)
                .map((answer, index) => {
                  if (answer) {
                    return (
                      <div
                        className={select.includes(index) ? "reponse active" : "reponse"}
                        key={index}
                        onClick={() => handleClick(index)}
                      >
                        {answer}
                      </div>)
                  }
                })}
            </div>
            <div className="valider">
              <button
                onClick={handleValidate}>
                Valider
              </button>
            </div>
          </>
        }
        {showScore &&
          <div className='scoreContainer'> 
            <div className="showScore">
              Score : {score}
            </div>
            <div className="message">
              {message[Math.floor(score/4)]}
            </div>
            <div className="replay"
            onClick={handleReplay}>
              Replay
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Quiz