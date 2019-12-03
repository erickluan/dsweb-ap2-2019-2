import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      erro: false
    }
  }

  async componentDidMount() {

    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      console.log("nulo");
      this.setState({
        erro: true,
      });
    } else {
      try {
        axios.get('http://localhost:3334/contatos/' + this.props.match.params.id, {
          headers: { Authorization: `JWT ${accessString}` },
        })
          .then(response => {
            this.setState({
              name: response.data.nome,
              email: response.data.email
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        // console.log(error.response.data);
        this.setState({
          erro: true,
        });
      }
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  async onSubmit(e) {
    e.preventDefault();
    const obj = {
      nome: this.state.name,
      email: this.state.email
    };

    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      console.log("nulo");
      this.setState({
        erro: true,
      });
    } else {
      try {
        axios.put('http://localhost:3334/contatos/' + this.props.match.params.id, obj, {
          headers: { Authorization: `JWT ${accessString}` },
        })
          .then(res => {
            console.log(res.data);
            this.props.history.push('/contatos/');
          });
      } catch (error) {
        // console.log(error.response.data);
        this.setState({
          erro: true,
        });
      }
    }

  }

  render() {
    if (this.state.erro == true) {
      return <Redirect to={"/"} />;
    }
    return (
      <div class="container-fluid">
        <h3 align="center">Atualizar Contato</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nome:  </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
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
              value="Atualizar"
              className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default Edit;