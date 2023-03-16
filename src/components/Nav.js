import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';
import { BiSearchAlt } from 'react-icons/bi';
import { MdFavoriteBorder } from 'react-icons/md';
import { HiOutlineUserCircle } from 'react-icons/hi';

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <BiSearchAlt className="icon-nav" />
            {' '}
            <Link
              className="link-nav"
              data-testid="link-to-search"
              to="/search"
            >
              Pesquisa

            </Link>
          </li>
          <li>
            <MdFavoriteBorder className="icon-nav" />
            {' '}
            <Link
              className="link-nav"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritos

            </Link>
          </li>
          <li>
            <HiOutlineUserCircle className="icon-nav" />
            <Link
              className="link-nav"
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil

            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
