import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    await addSong(music);
    const newFavoriteMusic = [...favoritesMusic, music];
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
    // console.log(response);
    if (response) {
      this.setState({
        isLoading: false,
        favoritesMusic: response,
      });
    } else {
      this.setState({
        isLoading: false,
        favoritesMusic: [],
      });
    }
  };

  fetchRemoveSong = async (music) => {
    const { updateFavorite } = this.props;
    this.setState({
      isLoading: true,
    });
    const responseRemove = await removeSong(music);
    console.log(responseRemove); // retorna OK
    if (responseRemove && typeof updateFavorite !== 'function') {
      await this.fetchGetFavoriteSong();
    } else {
      await updateFavorite();
    }
  };

  render() {
    const { arrayMusic } = this.props;
    const { isLoading, favoritesMusic } = this.state;
    // console.log(updateFavorite); -> recebendo por props
    // console.log('--------------------------');
    // console.log(favoritesMusic);
    // console.log('--------------------------');

    // console.log(musicObj);
    if (isLoading) return <Loading />;
    return (
      <div>
        {
          arrayMusic?.map((music) => (
            <div key={ music.trackName }>
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
                  // Checked feito com a ajuda do Emilio Butzlaff \o/
                  checked={ favoritesMusic
                    ?.some(({ trackId }) => trackId === music.trackId) }
                  onChange={ ({ target }) => (target.checked ? this.fetchAddSong(music)
                    : this.fetchRemoveSong(music)) }

                />
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  arrayMusic: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  updateFavorite: PropTypes.func,
};

MusicCard.defaultProps = {
  updateFavorite: null,
};
