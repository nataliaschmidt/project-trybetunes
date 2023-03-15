import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteMusics: [],
  };

  componentDidMount() {
    this.fetchGetFavoriteSongs();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { favoriteMusics: currentFavoriteMusics } = this.state;

  //   if (currentFavoriteMusics.length !== prevState.favoriteMusics.length) {
  //     this.setState({
  //       favoriteMusics: currentFavoriteMusics
  //     })
  //     // const newFavorites = JSON.stringify(currentFavoriteMusics);
  //     // localStorage.setItem('FAVORITE_SONGS_KEY', newFavorites);
  //   }
  // }

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
    if (isLoading) return <Loading />;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <MusicCard
            arrayMusic={ favoriteMusics }
            teste={ this.updateFavorite }
          />
        </div>
      </>
    );
  }
}
