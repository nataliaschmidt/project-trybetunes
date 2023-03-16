import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

const MIN_LENGTH = 3;
export default class Login extends Component {
  state = {
    loginName: '',
    isLoading: false,
    redirect: false,
  };

  fetchCreateUser = async () => {
    const { loginName } = this.state;
    this.setState({
      isLoading: true,
    });
    const response = await createUser({ name: loginName });
    // console.log(response); => Retorna OK
    if (response === 'OK') {
      this.setState({
        isLoading: false,
        redirect: true,
      });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { loginName, isLoading, redirect } = this.state;
    // console.log(this.props);

    const isFormValid = loginName.length >= MIN_LENGTH;

    if (isLoading) return <Loading />;

    if (redirect) return <Redirect to="/search" />;
    return (
      <div className="container-login" data-testid="page-login">
        <form className="form-login">
          <img
            className="logo"
            src="./images/logo.png"
            alt="logo trybetunes"
          />
          <label htmlFor="name" className="form-label">
            <input
              data-testid="login-name-input"
              type="text"
              id="name"
              className="form-control"
              name="loginName"
              placeholder="Qual seu nome?"
              value={ loginName }
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="login-submit-button"
            className="btn btn-primary"
            type="button"
            onClick={ () => this.fetchCreateUser() }
            disabled={ !isFormValid }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}
