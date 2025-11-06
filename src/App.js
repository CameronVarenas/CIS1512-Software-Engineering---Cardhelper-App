import React from 'react';
import Landing from './components/Landing.js';
import './App.css';

function App() {
  return (
      <div id='App'>
        <header id='header'>
          <nav id='header-text'>
            <h2>Cardhelper</h2>
            <h2 id='login-logout-button'>Login</h2>
          </nav>
        </header>
        <main id='main-content'>
          <Landing />
        </main>
      </div>
  );
}

export default App;
