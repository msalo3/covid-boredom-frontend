import React, { useState, useEffect } from 'react';
import TopLevel from './toplevel/TopLevel';

import './layout.css';

const lightTheme = {
  '--color-bg': '#f8f3eb',
  '--color-text': '#282c34',
  '--color-primary': '#f38181',
  '--color-secondary': '#ff5722',
  '--color-hover-bg': '#fce38a',
  '--color-hover-border': '#282c34',
  '--color-btn-selected': '#fce38a',
  '--color-qmark': '#282c34',
  '--color-letter-spin': '#3c5d74',
  '--color-footer-bg': '#f8f3eb',
  '--color-redacted': '#fce38a'
};
const darkTheme = {
  '--color-bg': '#282c34',
  '--color-text': '#ffffff',
  '--color-primary': '#555',
  '--color-secondary': '#0c969b',
  '--color-hover-bg': '#3c5d74',
  '--color-hover-border': '#1b1f2b',
  '--color-btn-selected': '#77dd91',
  '--color-qmark': '#3da9fc',
  '--color-letter-spin': '#3c5d74',
  '--color-footer-bg': '#282c34',
  '--color-redacted': '#000'
};

export default function Layout(props) {
  const [currentMode, setCurrentMode] = useState('light');
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('mode') === 'dark') {
      setCurrentMode('dark');
      setIsChecked(true);
    }
  }, []);
  
  useEffect(() => {
    const theme = currentMode === 'light' ? lightTheme : darkTheme;
    Object.keys(theme).forEach(key => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
  }, [currentMode]);
  
  
  const toggleTheme = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setIsChecked(!isChecked);
    setCurrentMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  return (
    <TopLevel
      {...props}
      toggleTheme={toggleTheme}
      isChecked={isChecked}
    >
      {props.children}
    </TopLevel>
  );
}