import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import routes from './routes';
import './App.css';

function App() {
  return (
    <HashRouter>
      <html id='App'>
        <header id='header'>
          <nav id='header-text'>
            <h2>Cardhelper</h2>
            <h2 id='login-logout-button'>Login</h2>
          </nav>
        </header>
        <body>
          {routes}
        </body>
      </html>
    </HashRouter>

  );
}

export default App;
