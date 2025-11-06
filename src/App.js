import { HashRouter, Link } from 'react-router-dom';
import routes from './routes';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div id='App'>
        <header id='header'>
          <nav id='header-text'>
            <h2><Link
              to='/'
            >Cardhelper</Link></h2>
            <h2 id='login-logout-button'><Link
              to='/auth'
            >Login</Link></h2>
          </nav>
        </header>
        <main id='main-content'>
          {routes}
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
