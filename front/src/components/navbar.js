import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
    render() {
        return (
          <div class="container-fluid">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
              <ul id="nav" class="navbar-nav mr-auto">
                <li class="nav-item"><Link class="nav-link" to={"/"}>Home</Link></li>
                <li class="nav-item"><Link class="nav-link" to={"/contatos"}>Contatos</Link></li>
                <li class="nav-item"><Link class="nav-link" to={"/sobre"}>Sobre</Link></li>
              </ul>
            </div>
          </nav>
          </div>

        );
    }
}

export default Navbar;