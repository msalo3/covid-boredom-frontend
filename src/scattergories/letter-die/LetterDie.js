import React, { useState, useEffect } from 'react';

import './letterdie.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T'];

const LetterDie = ({ timerIsCounting }) => {

  const [letter, setLetter] = useState('X');
  const [counter, setCounter] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function rollDie() {
    setIsActive(true);
    setCounter(0);
  }

  useEffect(() => {
    let interval = null;
    if (counter === 50) {
      clearInterval(interval);
      setIsActive(false);
      return () => clearInterval(interval);
    }
    if (isActive) {
      interval = setInterval(() => {
        setCounter(counter => counter + 1);
        setLetter(LETTERS[Math.floor(Math.random() * 19)])
      }, (100))
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, counter, letter]);


    return (
      <div className="letter-die-container">
        <div className="letter-container">
          <p className={isActive ? "letter" : "letter set"}>{letter}</p>
        </div>
        <button
          onClick={() => rollDie()}
          disabled={isActive || timerIsCounting}
          className="button btn-time"
        >
          Spin the Wheel!
        </button>
      </div>
    );
  }
export default LetterDie
