import React from "react";

import './footer.css';

const Footer = ({children}) => {
  return (
    <div>
      <div className='phantom' />
      <div className='child-style'>
        {children}
      </div>
    </div>
  );
}

export default Footer