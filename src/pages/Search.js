import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import SearchResults from '../components/SearchResults';

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
      <>
        <Header />
        <div data-testid="page-search">
          { isLoading ? <Loading />
            : (
              <form>
                <label htmlFor="search">
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
                  onClick={ () => this.fetchSearchAlbumAPI(search) }
                  disabled={ !isFormValid }
                >
                  Pesquisar

                </button>
              </form>)}
          {searchResults && searchArtistResult
          && <SearchResults artist={ searchArtistResult } musics={ musics } />}
        </div>
      </>
    );
  }
}
