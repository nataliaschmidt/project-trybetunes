import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Nav from './Nav';
import '../styles/Header.css';
import ImageUser from '../assets/images/user.png';
import ImageLogo from '../assets/images/logo.png';

export default class Header extends Component {
  state = {
    name: '',
    image: ImageUser,
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    const userObj = await getUser();
    this.setState({
      name: userObj.name,
      image: userObj.image ? userObj.image : ImageUser,
    });
  };

  render() {
    const { name, image } = this.state;
    // if (!name) return <Loading />;

    return (
      <header data-testid="header-component">
        <img
          className="header-logo"
          src={ ImageLogo }
          alt="foto do usuário"
        />
        <Nav />
        <div className="container-infoUser">
          <img
            className="user-image"
            src={ image }
            alt="foto do usuário"
          />
          { name ? <h2 data-testid="header-user-name">{name}</h2> : 'Carregando...'}
        </div>
      </header>
    );
  }
}
