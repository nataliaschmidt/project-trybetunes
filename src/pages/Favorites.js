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

  // REMOVENDO O CODIGO

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
    // response.forEach((music) => {
    //   this.setState((prevState) => ({
    //     favoriteMusics: [...prevState.favoriteMusics, music],
    //     isLoading: false,
    //   }));
    // });
  };

  render() {
    const { isLoading, favoriteMusics } = this.state;
    console.log(favoriteMusics);
    if (isLoading) return <Loading />;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <MusicCard arrayMusic={ favoriteMusics } />
        </div>
      </>
    );
  }
}
