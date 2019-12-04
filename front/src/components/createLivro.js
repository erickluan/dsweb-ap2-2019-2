import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class CreateLivro extends Component {
    constructor(props) {
        super(props);
        this.onChangeTituloLivro = this.onChangeTituloLivro.bind(this);
        this.onChangeISBN = this.onChangeISBN.bind(this);
        this.onChangeAutor = this.onChangeAutor.bind(this);
        this.onChangeAnoPublicacao = this.onChangeAnoPublicacao.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            titulo: '',
            autor: '',
            anoPublicacao: 0,
            isbn: '',
            erro: false
        }
    }
    onChangeAutor(e) {
        this.setState({
            autor: e.target.value
        });
    }
    onChangeTituloLivro(e) {
        this.setState({
            titulo: e.target.value
        });
    }
    onChangeAnoPublicacao(e) {
        this.setState({
            anoPublicacao: e.target.value
        });
    }
    onChangeISBN(e) {
        this.setState({
            isbn: e.target.value
        })
    }

    async componentDidMount() {

        const accessString = localStorage.getItem('JWT');
        if (accessString === null) {
            console.log("nulo");
            this.setState({
                erro: true,
            });
        } else {
            this.setState({
                erro: false,
            });
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        const obj = {
            titulo: this.state.titulo,
            autor: this.state.autor,
            anoPublicacao: this.state.anoPublicacao,
            isbn: this.state.isbn
        };

        const accessString = localStorage.getItem('JWT');
        if (accessString === null) {
            console.log("nulo");
            this.setState({
                erro: true,
            });
        } else {
            try {
                axios.post('http://localhost:4001/livros', obj, {
                    headers: { Authorization: `JWT ${accessString}` },
                })
                    .then(res => {
                        console.log(res.data);
                        this.props.history.push('/livros');
                    });
            } catch (error) {
                // console.log(error.response.data);
                this.setState({
                    erro: true,
                });
            }
        }

        this.setState({
            nome: '',
            email: '',
        })
    }

    render() {
        if (this.state.erro === true) {
            return <Redirect to={"/"} />;
        }
        return (
            <div class="container-fluid">
                <h3 align="center">Novo Livro</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Autor: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.autor}
                            onChange={this.onChangeAutor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ano Publicação: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.anoPublicacao}
                            onChange={this.onChangeAnoPublicacao}
                        />
                    </div>
                    <div className="form-group">
                        <label>Título: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.titulo}
                            onChange={this.onChangeTituloLivro}
                        />
                    </div>
                    <div className="form-group">
                        <label>ISBN: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.isbn}
                            onChange={this.onChangeISBN}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit"
                            value="Registrar Livro"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}


export default CreateLivro;