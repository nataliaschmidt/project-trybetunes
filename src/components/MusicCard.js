import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    favoritesMusic: [],
  };

  componentDidMount() {
    this.fetchGetFavoriteSong();
  }

  fetchAddSong = async (music) => {
    const { favoritesMusic } = this.state;
    this.setState({
      isLoading: true,
    });
    const newFavoriteMusic = [...favoritesMusic, music];
    await addSong(newFavoriteMusic);
    this.setState({
      isLoading: false,
      favoritesMusic: newFavoriteMusic,
    });
  };

  fetchGetFavoriteSong = async () => {
    this.setState({
      isLoading: true,
    });
    const response = await getFavoriteSongs();
    console.log(response);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { arrayMusic } = this.props;
    const { isLoading, favoritesMusic } = this.state;
    console.log(favoritesMusic);
    // console.log(musicObj);
    if (isLoading) return <Loading />;
    return (
      <div>
        {
          arrayMusic.map((music) => (
            <div div key={ music.trackName }>
              <h2>{music.trackName}</h2>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorite">
                Favorita
                <input
                  data-testid={ `checkbox-music-${music.trackId}` }
                  id="favorite"
                  type="checkbox"
                  name="favorite"
                  // disabled={  }
                  checked={ favoritesMusic.includes(music) }
                  onChange={ () => this.fetchAddSong(music) }
                />
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

// MusicCard.propTypes = {
//   trackName: PropTypes.string.isRequired,
//   previewUrl: PropTypes.string.isRequired,
//   trackId: PropTypes.number.isRequired,
// };
