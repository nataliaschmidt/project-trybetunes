import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    this.setState({
      isLoading: true,
    });
    const data = await getUser();
    console.log(data);
    const { name, email, image, description } = data;
    this.setState({
      isLoading: false,
      name,
      email,
      image,
      description,
    });
  };

  render() {
    const { name, email, image, description, isLoading } = this.state;

    if (isLoading) <Loading />;

    return (

      <div data-testid="page-profile">
        <Header />
        <img
          data-testid="profile-image"
          src={ image }
          alt="foto do usuário"
        />
        <h2>
          Nome:
          <p>{name}</p>
        </h2>
        <h4>
          Email:
          <p>{email}</p>
        </h4>
        <h4>
          Descrição:
          <p>{description}</p>
        </h4>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>

    );
  }
}
