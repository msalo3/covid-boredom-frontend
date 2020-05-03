import React from 'react'

import './instructions.css';

const BASIC = "Quickly write down answers to a category list that all begin with the same letter. Score points if no other player matches your answers. To win the game, score the most points.";
const SETUP_ZERO = "1. Everyone needs a piece of paper and a writing utensil. Number your paper 1-12.";
const SETUP_ONE = "2. Decide which List # you want to use or randomize the list by clicking the Randomize Button.";
const SETUP_TWO = "3. Roll the Letter Die to decide which lettere to use.";
const SETUP_THREE = "4. Choose how many minutes the round should last. The default is 3 minutes. Once you start the timer, the List Categories will be revealed.";
const SETUP_FOUR = "All players quickly fill in their answer sheets. Answers must fit the category, and must begin with the key letter. When the timer stops, all players must immediately stop writing.";
const SETUP_SIX = "Players, in turn, read their answers aloud. Players mark their own answer sheets by circling acceptable answers that do not match any other player's answers. Continue reading answers until all 12 categories have been marked. Then score 1 point for each of your circled answers.";

const setupStyle = {
  textAlign: 'center',
  fontWeight: 'bold'
};

const Instructions = () => (
  null
  // <Modal
  //   trigger={<Icon name="info circle" />}
  //   basic
  //   size='large'
  //   closeIcon
  //   dimmer
  // >
  //   <Modal.Content>
  //     <p className="item" style={setupStyle}>Objective:</p>
  //     <p className="item">{BASIC}</p>
  //     <p className="item" style={setupStyle}>Setup Steps:</p>
  //     <p className="item">{SETUP_ZERO}</p>
  //     <p className="item">{SETUP_ONE}</p>
  //     <p className="item">{SETUP_TWO}</p>
  //     <p className="item">{SETUP_THREE}</p>
  //     <p className="item" style={setupStyle}>Playing the Game:</p>
  //     <p className="item">{SETUP_FOUR}</p>
  //     <p className="item" style={setupStyle}>Scoring the round:</p>
  //     <p className="item">{SETUP_SIX}</p>
  //   </Modal.Content>
  // </Modal>
)

export default Instructions



