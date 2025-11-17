import { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import routes from './routes';
import './App.css';
import { connect } from 'react-redux';
import { updateUser } from './redux/user_reducer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    axios
      .get('/auth/session')
      .then(user => {
        this.props.updateUser(user.data);
      })
  }

  logout() {
    axios
      .get('/auth/logout')
      .then(() => {
        this.props.updateUser(null);
        this.props.history.push('/');
      })
  }

  render() {
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
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, {updateUser})(App));