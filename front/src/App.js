import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Create from './components/create';
import Edit from './components/edit';
import Index from './components';

import Login from './components/login';
import Registrar from './components/registrar';
import Contatos from './components/contatos';
import Sobre from './components/sobre';


class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
              <Route exact path='/contatos/create' component={ Create } />
              <Route path='/contatos/edit/:id' component={ Edit } />
              <Route path='/contatos' component={ Contatos } />
              <Route path='/sobre' component={ Sobre } />
              <Route path='/register' component={ Registrar } />
              <Route path='/login' component={ Login } />
              <Route path='/' component={ Index } />
              <Route path='/' component={ Index } />
          </Switch>
      </Router>
    );
  }
}

export default App;
