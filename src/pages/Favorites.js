import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

export default class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteMusics: [],
  };

  componentDidMount() {
    this.fetchGetFavoriteSongs();
  }

  fetchGetFavoriteSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const response = await getFavoriteSongs();
    console.log(response);
    this.setState({
      favoriteMusics: response,
      isLoading: false,
    });
  };

  updateFavorite = async () => {
    await this.fetchGetFavoriteSongs();
  };

  render() {
    const { isLoading, favoriteMusics } = this.state;
    console.log(favoriteMusics);
    // if (isLoading) return <Loading />;
    return (
      <div className="container-search">
        <div className="container-header-search">
          <Header className="header" />
        </div>
        <div data-testid="page-favorites" className="container-form-result">
          <div className="container-form-search">
            <h3 className="favorite-title">Músicas Favoritas</h3>
          </div>
          <div className="container-favorites">
            <MusicCard
              arrayMusic={ favoriteMusics }
              updateFavorite={ this.updateFavorite }
            />
          </div>
        </div>
      </div>
    );
  }
}
