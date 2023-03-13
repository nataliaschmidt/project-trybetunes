import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Nav from './Nav';

export default class Header extends Component {
  // Ainda não tenho o valor das outras chaves de retorno da função.
  state = {
    name: '',
    // email: '',
    // image: '',
    // description: '',
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    const userObj = await getUser();
    console.log(userObj);
    this.setState({
      name: userObj.name,
      // email: userObj.email,
      // image: userObj.image,
      // description: userObj.description,
    });
  };

  render() {
    const { name } = this.state;
    if (!name) return <Loading />;

    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">{name}</h2>
        <Nav />
      </header>
    );
  }
}
