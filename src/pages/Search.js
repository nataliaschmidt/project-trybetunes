import React, { Component } from 'react';
import Header from '../components/Header';

const MIN_LENGTH = 2;

export default class Search extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { search } = this.state;

    const isFormValid = search.length >= MIN_LENGTH;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <label htmlFor="name">
              Pesquisar:
              <input
                data-testid="search-artist-input"
                type="text"
                id="search"
                name="search"
                value={ search }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="button"
              // onClick={ () =>  }
              disabled={ !isFormValid }
            >
              Entrar

            </button>
          </form>

        </div>
      </>
    );
  }
}
