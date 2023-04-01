import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css'

export default class ProfileEdit extends Component {
  state = {
    isLoading: false,
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',

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
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onButtonSave = () => {
    const { history } = this.props;
    const { userName, userEmail, userImage, userDescription } = this.state;
    this.setState({
      isLoading: true,
    });
    const ApiObj = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };
    this.setState({
      isLoading: false,
    });

    history.push('/profile');
    const response = updateUser(ApiObj);
    return response
  };

  render() {
    const { userName, userEmail, userImage, userDescription, isLoading } = this.state;

    if (isLoading) return <Loading />;

    const isFormValid = userName.length
      && userEmail.length
      && userImage.length
      && userDescription.length > 0;

    return (
      <div className="container-search">
        <div className="container-header-search">
          <Header className="header" />
        </div>
        <div data-testid="page-profile-edit" className="container-form-result">
          <div className="container-form-search">
            <h3 className="favorite-title">Editar Perfil</h3>
          </div>

          <form className='form-profile-edit'>
            <label htmlFor="userName" className="form-label">
              Nome:
              <input
                data-testid="edit-input-name"
                id="userName"
                className="form-control"
                type="text"
                name="userName"
                value={ userName }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="userEmail" className="form-label">
              Email:
              <input
                data-testid="edit-input-email"
                id="userEmail"
                id="userEmail"
                className="form-control"
                type="email"
                name="userEmail"
                value={ userEmail }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="userDescription" className="form-label">
              Descrição:
              <input
                data-testid="edit-input-description"
                id="userDescription"
                id="userEmail"
                className="form-control"
                type="text"
                name="userDescription"
                value={ userDescription }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="userImage" className="form-label">
              Imagem:
              <input
                data-testid="edit-input-image"
                id="userImage"
                id="userEmail"
                className="form-control"
                type="text"
                name="userImage"
                value={ userImage }
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              data-testid="edit-button-save"
              className="btn btn-primary"
              disabled={ !isFormValid }
              onClick={ this.onButtonSave }
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
