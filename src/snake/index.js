import React, { useRef, useState, useEffect } from "react"
import ranks from './ranks'

import "./snake.css"

const boardborder = 'black';
const boardbackground = "white";
const snakecol = 'lightblue';
const snakeborder = 'darkblue';
const foodcol = 'lightgreen'
const foodborder = 'darkgreen'
const factor = 2;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;


const Snake = () => {
  const [snakeboard, setSnakeboard] = useState(null)
  const [snakeboardCtx, setSnakeboardCtx] = useState(null)

  const [screen, setScreen] = useState("snake-home")
  const [score, setScore] = useState(0)
  const [currentSnake, setCurrentSnake] = useState("Snake Game")
  const [dx, setDx] = useState(10)
  const [dy, setDy] = useState(0)
  const [food, setFood] = useState({ x: undefined, y: undefined })
  const [changingDirection, setChangingDirection] = useState(false)
  const [endText, setEndText] = useState('')
  const [imgSrc, setimgSrc] = useState("")
  const [imgStyle, setImgStyle] = useState('none')
  const [startBtnStyle, setStartBtnStyle] = useState('inline-block')
  const [snakeObj, setSnakeObj] = useState(
    [
      { x: 200, y: 200 },
      { x: 190, y: 200 },
      { x: 180, y: 200 },
      { x: 170, y: 200 },
      { x: 160, y: 200 }
    ]
  )
  // const canvasRef = useRef(null)
  // const snakeboard = canvasRef.current
  // const snakeboardCtx = snakeboard.getContext('2d')
  const useCanvas = (callback) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      console.log('HERE', canvasRef)
      const ctx = canvas.getContext('2d');
      callback([canvas, ctx]);
    }, []);

    return canvasRef;
  }
  const canvasRef = useCanvas(([canvas, ctx]) => {
    setSnakeboard(canvas)
    setSnakeboardCtx(ctx)
  });
  
  useEffect(() => {
    function downHandler({ key }) {
      if (changingDirection) return

      setChangingDirection(false)
      if (key === LEFT_KEY && dx !== 10) {
        setDx(-10);
        setDy(0)
      }
      if (key === UP_KEY && dy !== 10) {
        setDx(0);
        setDy(-10)
      }
      if (key === RIGHT_KEY && dx !== -10) {
        setDx(10);
        setDy(0)
      }
      if (key === DOWN_KEY && dy !== -10) {
        setDx(0);
        setDy(10)
      }
    }

    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [dx, dy, changingDirection]);

  const main = () => {
    if (score >= (ranks.length * factor)) {
      setStartBtnStyle('inline-block')
      setEndText("You Won!!!!")
      return
    }
    if (hasGameEnded()) {
      setStartBtnStyle('inline-block')
      setEndText("Game Over")
      return;
    }

    setChangingDirection(false)
    setTimeout(function onTick() {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      main();
    }, 50)
  }
  
  function resetGame() {
    setEndText("")
    setSnakeObj([
      { x: 200, y: 200 },
      { x: 190, y: 200 },
      { x: 180, y: 200 },
      { x: 170, y: 200 },
      { x: 160, y: 200 }
    ])
    setScore(0)
    setChangingDirection(false)
    setFood({ x: undefined, y: undefined })
    setDx(10)
    setDy(0)
  }

  function hasGameEnded() {
    for (let i = 4; i < snakeObj.length; i++) {
      if (snakeObj[i].x === snakeObj[0].x && snakeObj[i].y === snakeObj[0].y) return true
    }
    const hitLeftWall = snakeObj[0].x < 0;
    const hitRightWall = snakeObj[0].x > snakeboard.width - 10;
    const hitToptWall = snakeObj[0].y < 0;
    const hitBottomWall = snakeObj[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
  }

  function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }

  function generateFood() {
    let foodx = randomFood(0, snakeboard.width - 10);
    let foody = randomFood(0, snakeboard.height - 10);
    snakeObj.forEach((part) => {
      const hasEaten = part.x == foodx && part.y == foody;
      if (hasEaten) {
        generateFood();
      } else {
        setFood({ x: foodx, y: foody })
      }
    });
  }

  function moveSnake() {
    const head = { x: snakeObj[0].x + dx, y: snakeObj[0].y + dy };
    snakeObj.unshift(head);
    const hasEatenFood = snakeObj[0].x === food.x && snakeObj[0].y === food.y;
    if (hasEatenFood) {
      const newScore = score + 1;
      if (newScore <= ((ranks.length - 1) * factor)) {
        const idx = Math.floor(newScore / factor)
        setCurrentSnake(ranks[idx].name);
        setimgSrc(ranks[idx].img);
        generateFood();
      }
    } else {
      snakeObj.pop();
    }
  }

  function clearBoard() {
    snakeboardCtx.fillStyle = boardbackground;
    snakeboardCtx.strokestyle = boardborder;
    snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
  }

  function drawSnake() {
    snakeObj.forEach(drawSnakePart)
  }

  function drawFood() {
    snakeboardCtx.fillStyle = foodcol;
    snakeboardCtx.strokestyle = foodborder;
    snakeboardCtx.fillRect(food.x, food.y, 10, 10);
    snakeboardCtx.strokeRect(food.x, food.y, 10, 10);
  }

  function drawSnakePart(snakePart) {
    snakeboardCtx.fillStyle = snakecol;
    snakeboardCtx.strokestyle = snakeborder;
    snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }

  if (screen === "snake-home") {
    return (
      <div>
        <h3>Please note, this game can only be played on a computer with a keyboard. It won't work on a mobile device.</h3>
        <button onClick={() => setScreen('snake-game')}>OK</button>
      </div>
    )
  }

  return (
    <>
      <div id="score" className="text">
        {currentSnake}
      </div>
      <div className="text">
        <button
          id="start-btn"
          onClick={() => {
            setScore(ranks[0].name)
            setimgSrc(ranks[0].img)
            setImgStyle('inline-block')
            setStartBtnStyle('none')
            if (hasGameEnded()) resetGame()
            main()
          }}
          style={{ display: startBtnStyle }}
        >
          Start
        </button>
      </div>
      <p id="endtext" className="text">{endText}</p>
      <canvas ref={canvasRef} id="snakeboard" width="500" height="500" />
      <img
        style={{ display: imgStyle }}
        alt="different snakes"
        id="img"
        width="500"
        height="500"
        src={imgSrc}
      />
    </>
  )
}

export default Snake
