import React, { Component } from 'react';
import '../styles/Loading.css'
import ImageLogo from '../assets/images/logo.png';

export default class Loading extends Component {
  render() {
    return (

      <div className='container-loading'>
        <h1 className='loading-big'>Carregando...</h1>
        <img
          className="loading-logo"
          src={ ImageLogo }
          alt="imagem do logo"
        />
      </div>
    );
  }
}
