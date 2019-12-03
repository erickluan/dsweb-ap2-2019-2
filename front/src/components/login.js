import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            showError: false,
            showNullError: false,
        };
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    loginUser = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        if (username === '' || password === '') {
            this.setState({
                showError: false,
                showNullError: true,
                loggedIn: false,
            });
        } else {

            const user = {
                username: username,
                password: password,
            };

            axios.post('http://localhost:4000/loginUser', user)
                .then(res => {
                    console.log(res.data);
                    if (
                        res.data === 'bad username'
                        || res.data === 'passwords do not match'
                    ) {
                        this.setState({
                            showError: true,
                            showNullError: false,
                        });
                    } else {
                        localStorage.setItem('JWT', res.data.token);
                        this.setState({
                            loggedIn: true,
                            showError: false,
                            showNullError: false,
                        });
                    }
                });

        }
    };


    render() {
        const {
            username,
            password,
            showError,
            loggedIn,
            showNullError,
        } = this.state;
        if (!loggedIn) {
            return (
                <div class="container-fluid">
                    <form className="profile-form" onSubmit={this.loginUser}>
                        <fieldset>
                            <legend>Login</legend>
                            <input
                                id="username"
                                label="username"
                                value={username}
                                onChange={this.handleChange('username')}
                                placeholder="Username"
                            />
                            <br />
                            <input
                                id="password"
                                label="password"
                                value={password}
                                onChange={this.handleChange('password')}
                                placeholder="Password"
                                type="password"
                            />
                            <br />
                            <button type="submit">Login</button>
                        </fieldset>
                    </form>
                    <br />
                    
          
                    {showNullError && (
                        <div>
                            <p>O username e/ou password não pode ser nulo.</p>
                        </div>
                    )}
                    {showError && (
                        <div>
                            <p>
                                Username e/ou password não reconhecido. Por favor, registre-se.
              </p>
                        </div>
                    )}
                <Link to={"/register"} style={{margin: '0px 30px'}} className="btn btn-success">Registrar-se</Link>
                </div>
            );
        }
        return <Redirect to={"/contatos/"} />;
    }
}

export default Login;
