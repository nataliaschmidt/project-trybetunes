import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link data-testid="link-to-search" to="/search">Pesquisa</Link></li>
          <li><Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link></li>
          <li><Link data-testid="link-to-profile" to="/profile">Perfil</Link></li>
        </ul>
      </nav>
    );
  }
}
