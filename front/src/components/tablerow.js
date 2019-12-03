import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  async delete() {
    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      console.log("nulo");
      this.props.geraErro(true);
    } else {
      try {
        axios.delete('http://localhost:3334/contatos/' + this.props.obj._id, {
          headers: { Authorization: `JWT ${accessString}` },
        })
          .then(res => this.props.atualizaDados(res.data))
          .catch(err => console.log(err));
      } catch (error) {
        // console.log(error.response.data);
        this.props.geraErro(true);
      }
    }

  }
  render() {
    return (
      <tr>
        <td>
          {this.props.obj.nome}
        </td>
        <td>
          {this.props.obj.email}
        </td>
        <td>
          <Link to={"/contatos/edit/" + this.props.obj._id} className="btn btn-primary">Editar</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Deletar</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
