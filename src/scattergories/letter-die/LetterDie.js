import React, { useState, useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react'

import './letterdie.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T'];

const LetterDie = () => {

  const [letter, setLetter] = useState('?');
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
      <div className="letter-die">
        <Grid style={{marginTop: '20px'}}>
          <Grid.Row style={{justifyContent: 'space-around'}}>
            <p className={isActive ? "letter" : "letter set"}>{letter}</p>
          </Grid.Row>
        </Grid>
        <Button onClick={() => rollDie()} disabled={isActive}>
          Spin the Wheel!
        </Button>
      </div>
    );
  }
export default LetterDie
