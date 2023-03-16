import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Nav from './Nav';
import '../styles/Header.css';

export default class Header extends Component {
  state = {
    name: '',
    image: './images/user.png',
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    const userObj = await getUser();
    // console.log(userObj);
    this.setState({
      name: userObj.name,
      image: userObj.image ? userObj.image : './images/user.png',
    });
  };

  render() {
    const { name, image } = this.state;
    // if (!name) return <Loading />;

    return (
      <header data-testid="header-component">
        <img
          className="header-logo"
          src="./images/logo.png"
          alt="foto do usuário"
        />
        <Nav />
        <div className="container-infoUser">
          <img
            className="user-image"
            src={ image }
            alt="foto do usuário"
          />
          { name ? <h2 data-testid="header-user-name">{name}</h2> : <Loading />}
        </div>
      </header>
    );
  }
}
