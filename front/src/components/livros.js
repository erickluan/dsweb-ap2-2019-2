import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import TableRowLivro from './tableRowLivro';
import NavBar from './navbar'

class Livros extends Component {

  constructor(props) {
    super(props);
    this.state = { livros: [] };
    this.atualizaDados = this.atualizaDados.bind(this)
    this.geraErro = this.geraErro.bind(this)
    this.erro = false;
  }

  atualizaDados(data) {
    this.setState({ livros: data });
  }

  geraErro(valor) {
    this.setState({
      erro: valor
    });
  }

  logout = () => {
    localStorage.removeItem('JWT');
    this.setState({
      erro: true,
    });
  };

  async componentDidMount() {

    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      console.log("nulo");
      this.setState({
        erro: true,
      });
    } else {
      try {
        axios.get('http://localhost:4001/livros',{
          headers: { Authorization: `JWT ${accessString}` },
        })
          .then(res => this.atualizaDados(res.data))
          .catch(error => this.geraErro(true))
      } catch (error) {
        // console.log(error.response.data);
        this.setState({
          erro: true,
        });
      }
    }
  }


  tabRow() {
    var atDados = this.atualizaDados;
    var geradorDeErro = this.geraErro;
    const {
      match: {
        params: { username },
      },
    } = this.props;
    return this.state.livros.map(function (object, i) {
      return <TableRowLivro obj={object} key={i} atualizaDados={atDados} username={username} geraErro={geradorDeErro} />;
    });
  }

  render() {
    if (this.state.erro == true) {
      return <Redirect to={"/login"} />;
    } else {
      return (
        <div class="container-fluid">
          <NavBar/>
          <h3 align="center">Lista de Livros</h3>
          <Link to={"/livros/create/"} style={{ margin: '0px 30px' }} className="btn btn-success">Adicionar</Link>
          <button onClick={this.logout} style={{ margin: '0px 30px' , float: 'right'}} className="btn btn-danger">Sair</button>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano Publicação</th>
                <th>ISBN</th>
                <th colSpan="2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Livros;