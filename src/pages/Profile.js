import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

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

    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-profile" className="container-search">
        <div className="container-header-search">
          <Header className="header" />
        </div>
        <div className="container-form-result">
          <div className="container-form-search">
            <h3 className="favorite-title">Perfil</h3>
          </div>
          <div className="container-perfil">
            <div className="container-img-perfil">
              {image !== ''
              && <img
                className="img-perfil"
                data-testid="profile-image"
                src={ image }
                alt="foto do usuário"
              />}

              <div className="user">
                <h4>
                  Usuário:
                  <p>{name}</p>
                </h4>

                <h4>
                  Email:
                  <p>{email}</p>
                </h4>
              </div>
            </div>
            <div className="description">
              <h4>
                Descrição:
                <p>{description}</p>
              </h4>
            </div>
            <div className="container-edit-perfil">
              <Link className="link-to-perfil" to="/profile/edit">
                <CiEdit className="icon-edit" />
                {' '}
                Editar perfil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
