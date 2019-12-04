import React, { Component } from 'react';
import axios from 'axios';

class TableRowLivro extends Component {

  constructor(props) {
    super(props);
    this.deleteLivro = this.deleteLivro.bind(this);
  }
  async deleteLivro() {
    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      console.log("nulo");
      this.props.geraErro(true);
    } else {
      try {
        axios.delete('http://localhost:4001/livros/' + this.props.obj._id, {
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
          {this.props.obj.titulo}
        </td>
        <td>
          {this.props.obj.autor}
        </td>
        <td>
          {this.props.obj.anoPublicacao}
        </td>
        <td>
          {this.props.obj.isbn}
        </td>
        <td>
          <button onClick={this.deleteLivro} className="btn btn-danger">Deletar</button>
        </td>
      </tr>
    );
  }
}

export default TableRowLivro;
