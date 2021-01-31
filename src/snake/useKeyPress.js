import { useState, useEffect } from "react"

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

const useKeyPress = (changingDirection, dy, dx) => {
  // State for keeping track of whether key is pressed
  const [keyPressData, setkeyPressData] = useState({ dy, dx, changingDirection});

  // Add event listeners
  useEffect(() => {
    function downHandler({ key }) {
      if (changingDirection) return

      let newDy = dy
      let newDx = dx
      if (key === LEFT_KEY && newDx !== 10) {
        newDx = -10;
        newDy = 0;
      }
      if (key === UP_KEY && newDy !== 10) {
        newDx = 0;
        newDy = -10;
      }
      if (key === RIGHT_KEY && newDx !== -10) {
        newDx = 10;
        newDy = 0;
      }
      if (key === DOWN_KEY && newDy !== -10) {
        newDx = 0;
        newDy = 10;
      }

      setkeyPressData({
        dy: newDy,
        dx: newDx,
        changingDirection: true
      })
    }

    window.addEventListener('keydown', downHandler);
  
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [dx, dy, changingDirection]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressData;
}

export default useKeyPress