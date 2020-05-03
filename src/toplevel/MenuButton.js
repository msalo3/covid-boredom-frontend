import React from "react";

import './menubutton.css';

function MenuButton ({ activeItem, text, children }) {
  return (
    <div className='menu-icon'>
      {children}
    </div>
  );
}

export default MenuButton;
