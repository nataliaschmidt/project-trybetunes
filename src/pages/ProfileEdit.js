import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

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
    const response = updateUser(ApiObj);
    console.log(response);
    this.setState({
      isLoading: false,
    });

    return history.push('/profile');
  };

  render() {
    const { userName, userEmail, userImage, userDescription, isLoading } = this.state;

    if (isLoading) <Loading />;

    const isFormValid = userName.length
      && userEmail.length
      && userImage.length
      && userDescription.length > 0;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <form>
            <label htmlFor="userName">
              Nome:
              <input
                data-testid="edit-input-name"
                id="userName"
                type="text"
                name="userName"
                value={ userName }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="userEmail">
              Email:
              <input
                data-testid="edit-input-email"
                id="userEmail"
                type="email"
                name="userEmail"
                value={ userEmail }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="userDescription">
              Descrição:
              <input
                data-testid="edit-input-description"
                id="userDescription"
                type="text"
                name="userDescription"
                value={ userDescription }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="userImage">
              Imagem:
              <input
                data-testid="edit-input-image"
                id="userImage"
                type="text"
                name="userImage"
                value={ userImage }
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ !isFormValid }
              onClick={ this.onButtonSave }
            >
              Salvar
            </button>
          </form>
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
