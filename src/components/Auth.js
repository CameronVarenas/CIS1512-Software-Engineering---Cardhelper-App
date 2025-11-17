import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../redux/user_reducer';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            register_username: '',
            register_password: '',
            register_password_reType: '',
            register_email: '',
        };
        this.login = this.login.bind(this);
    }

    handleLoginUsernameInput(e) {
        this.setState({username: e.target.value});
    }

    handleLoginPasswordInput(e) {
        this.setState({password: e.target.value});
    }

    handleRegisterUsernameInput(e) {
        this.setState({register_username: e.target.value});
    }

    handleRegisterEmailInput(e) {
        this.setState({register_email: e.target.value});
    }

    handleRegisterPasswordInput(e) {
        this.setState({register_password: e.target.value});
    }

    handleRegisterRetypePasswordInput(e) {
        this.setState({register_password_reType: e.target.value});
    }

    login() {
        const {username, password} = this.state;
        axios
            .post('/auth/login', {username, password})
            .then(user => {
                this.props.updateUser(user.data);
                this.props.history.push('/user-decks')
            })
            .catch(error => {
                this.setState({username: '', password: ''});
                alert(error.response.request.response);
            });
    }

    register() {
        const {
            register_username,
            register_email,
            register_password,
            // register_password_reType
        } = this.state;
        axios
            .post('/auth/register', {
                register_username,
                register_email,
                register_password,
                // register_password_reType
            })
            .then(user => {
                this.props.updateUser(user.data);
                this.props.history.push('/user-decks');
            })
            .catch(error => {
                this.setState({
                    register_username: '',
                    register_email: '',
                    register_password: '',
                    // register_password_reType: ''
                });
                alert(error.response.request.response);
            });
    }

    render() {
        return(
            <div>
                <h3>Login</h3>
                <section>
                    <input
                        className='auth-inputs'
                        type='text'
                        placeholder='Username'
                        onChange={e => this.handleLoginUsernameInput(e)}
                        value={this.state.username}
                    ></input>
                </section>
                <section>
                    <input
                        className='auth-inputs'
                        type='text'
                        placeholder='Password'
                        onChange={e => this.handleLoginPasswordInput(e)}
                        value={this.state.password}
                    ></input>
                </section>
                <section>
                    <button
                        onClick={() => this.login()}
                    >Login</button>
                    <p>Forgot Password?</p>
                </section>
    
                <p>Or</p>
    
                <h3>Register Now</h3>
                <section>
                    <input
                        className='auth-inputs'
                        type='text'
                        placeholder='Username'
                        onChange={e => this.handleRegisterUsernameInput(e)}
                        value={this.state.register_username}
                    ></input>
                </section>
                <section>
                    <input
                        className='auth-inputs'
                        type='text'
                        placeholder='Email Address'
                        onChange={e => this.handleRegisterEmailInput(e)}
                        value={this.state.register_email}
                    ></input>
                </section>
                <section>
                    <input
                        className='auth-inputs'
                        type='text'
                        placeholder='Password'
                        onChange={e => this.handleRegisterPasswordInput(e)}
                        value={this.state.register_password}
                    ></input>
                </section>
                {/* <section>
                    <input
                        className='auth-input'
                        type='text'
                        placeholder='Re-Type Password'
                        onChange={e => this.handleRegisterRetypePasswordInput(e)}
                        value={this.state.register_password_reType}
                    ></input>
                </section> */}
                <section>
                    <button
                        onClick={() => this.register()}
                    >Register</button>
                </section>
            </div>
        )
    }
}

export default connect(state => state, {updateUser})(Auth);