import React, { useState, useEffect } from 'react';
import Footer from './footer/Footer';
import FooterContent from './footer/FooterContent';

import './layout.css';

const lightTheme = {
  '--color-bg': '#f8f3eb',
  '--color-text': '#282c34',
  '--color-primary': '#f38181',
  '--color-secondary': '#ff5722',
  '--color-hover-bg': '#eaffd0',
  '--color-hover-border': '#282c34',
  '--color-btn-selected': '#81F3F3',
  '--color-qmark': '#3da9fc',
  '--color-letter-spin': '#3c5d74',
  '--color-footer-bg': '#f8f3eb'
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
  '--color-footer-bg': '#282c34'
};

export default function Layout({ children }) {
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
    <div className="site">
      {children}
      <Footer>
        <FooterContent
          toggleTheme={toggleTheme}
          isChecked={isChecked}
        />
      </Footer>
    </div>
  );
}