import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nome: '',
      email: '',
      erro: false
    }
  }
  onChangePersonName(e) {
    this.setState({
      nome: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
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
      nome: this.state.nome,
      email: this.state.email,
    };

    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      console.log("nulo");
      this.setState({
        erro: true,
      });
    } else {
      try {
        axios.post('http://localhost:4000/contatos', obj, {
          headers: { Authorization: `JWT ${accessString}` },
        })
          .then(res => {
            console.log(res.data);
            this.props.history.push('/contatos');
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
    if (this.state.erro == true) {
      return <Redirect to={"/"} />;
    }
    return (
      <div class="container-fluid">
        <h3 align="center">Novo Contato</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nome: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.nome}
              onChange={this.onChangePersonName}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>

          <div className="form-group">
            <input type="submit"
              value="Registrar Contato "
              className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}


export default Create;