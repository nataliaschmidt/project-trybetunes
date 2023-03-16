import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import SearchResults from '../components/SearchResults';
import '../styles/Search.css';

const MIN_LENGTH = 2;

export default class Search extends Component {
  state = {
    search: '',
    isLoading: false,
    searchResults: false,
    searchArtistResult: '',
    musics: [],
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  fetchSearchAlbumAPI = async (search) => {
    this.setState({
      isLoading: true,
    });
    const music = await searchAlbumsAPI(search);
    console.log(music);
    // retorna um array de objetos
    if (music) {
      this.setState({
        isLoading: false,
        searchResults: true,
        search: '',
        searchArtistResult: search,
        musics: music,
      });
    }
  };

  render() {
    const { search, isLoading, searchResults, searchArtistResult, musics } = this.state;
    console.log(search);
    const isFormValid = search.length >= MIN_LENGTH;

    return (
      <div className="container-search">
        <div className="container-header-search">
          <Header className="header" />
        </div>
        <div className="container-form-result" data-testid="page-search">
          { isLoading ? <Loading />
            : (
              <div className="container-form-search">
                <form>
                  <label htmlFor="search" className="form-label">
                    <input
                      data-testid="search-artist-input"
                      type="text"
                      id="search"
                      className="form-control"
                      placeholder="Digite a sua pesquisa"
                      name="search"
                      value={ search }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <button
                    data-testid="search-artist-button"
                    type="button"
                    className="btn btn-primary"
                    onClick={ () => this.fetchSearchAlbumAPI(search) }
                    disabled={ !isFormValid }
                  >
                    Pesquisar

                  </button>
                </form>
              </div>)}
          <div className="container-result-search">
            { searchResults && searchArtistResult
          && <SearchResults artist={ searchArtistResult } musics={ musics } />}
          </div>
        </div>
      </div>
    );
  }
}
