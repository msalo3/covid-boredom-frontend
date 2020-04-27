import React, { useState, useEffect } from 'react';

import './timer.css';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(props.seconds);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
    props.timerToggled();
  }

  function reset() {
    setSeconds(props.seconds)
    if (isActive) props.timerToggled();
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (seconds === 0) {
      clearInterval(interval);
      return () => clearInterval(interval);
    }
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function displayTime(seconds) {
    if (seconds === 0) return "Timer Done!";
    const minutes = Math.floor(seconds / 60);
    const finalSeconds = seconds - (minutes * 60);
    return `${minutes}:${("0" + finalSeconds).slice(-2)}`;
  }

  return (
    <div className="app">
      <div className="time">
        {displayTime(seconds)}
      </div>
      <div className="row">
        <button
          className={seconds === 0 ? 'button-hide' : `button button-primary button-primary-${isActive ? 'active' : 'inactive'}`}
          onClick={toggle}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="row">
        <button className={isActive ? "button-hide" : "button"} onClick={() => props.onClick()}>
          Customize Time
        </button>
      </div>
    </div>
  );
}

Timer.defaultProps = {
  seconds: 180
}

export default Timer
