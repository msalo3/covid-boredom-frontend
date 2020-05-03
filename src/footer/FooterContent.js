import React from "react";
import Toggle from './Toggle';

import './footercontent.css'

const FooterContent = ({toggleTheme, isChecked}) => {
  return (
    <div className="footer-container">
      <div className={isChecked ? "show-me" : "hide-me"}>Dark Mode</div>
      <Toggle
        toggleTheme={toggleTheme}
        isChecked={isChecked}
      />
      <div className={isChecked ? "hide-me" : "show-me"}>Light Mode</div>
    </div>
  );
}

export default FooterContent