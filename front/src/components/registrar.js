import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Registrar extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            nome: '',
            showError: false,
            showNullError: false,
        };
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    registerUser = async (e) => {
        e.preventDefault();
        const { username, password, nome } = this.state;
        if (username === '' || password === '' || nome === '') {
            this.setState({
                showError: false,
                showNullError: true
            });
        } else {

            const user = {
                nome: nome,
                username: username,
                password: password,
            };

            axios.post('http://localhost:4001/registerUser', user)
                .then(res => {
                    console.log(res.data);
                    if (
                        res.data === 'username or email already taken'
                    ) {
                        this.setState({
                            showError: true,
                            showNullError: false,
                        });
                    } else {
                        this.props.history.push('/');
                        this.setState({
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
            nome,
            showError,
            showNullError,
        } = this.state;

        return (
          <div class="container-fluid">
                <form className="profile-form" onSubmit={this.registerUser}>
                    <fieldset>
                        <legend>Registrar</legend>
                        <input
                            id="nome"
                            label="nome"
                            value={nome}
                            onChange={this.handleChange('nome')}
                            placeholder="Nome"
                        />
                        <br />
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
                        <button type="submit">Registrar</button>
                    </fieldset>
                </form>
                <br />
               
                {showNullError && (
                    <div>
                        <p>O nome e/ou username e/ou password não pode ser nulo.</p>
                    </div>
                )}
                {showError && (
                    <div>
                        <p>
                            Username já existente.
              </p>
                    </div>
                )}
            <Link to={"/"} style={{margin: '0px 30px'}} className="btn btn-primary">voltar</Link>
            </div>
        );

    }
}

export default Registrar;
