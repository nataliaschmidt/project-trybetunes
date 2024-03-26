import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// import Loading from './Loading';
import '../styles/MusicCard.css';

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

  // TESTANDO CODIGO

  playMusic = () => {
    const { musicPlay } = this.props;
    musicPlay(true);
  };

  stopMusic = () => {
    const { musicPlay } = this.props;
    musicPlay(false);
  };

  render() {
    console.log(this.props);
    const { arrayMusic } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { isLoading, favoritesMusic } = this.state;
    // console.log(updateFavorite); -> recebendo por props
    // console.log('--------------------------');
    // console.log(favoritesMusic);
    // console.log('--------------------------');

    // console.log(musicObj);
    //  if (isLoading) return <Loading />;
    return (
      <div>
        {
          arrayMusic?.map((music) => (
            <div key={ music.trackName } className="container-card-music">
              <div className="trackname">
                <h3>{music.trackName}</h3>
                <h6>{music.artistName}</h6>
              </div>

              <div className="audio">
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                  onPlay={ this.playMusic }
                  onPause={ this.stopMusic }
                  onEnded={ this.stopMusic }
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="favorite">
                  <input
                    className="checkbox-favorite"
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
  musicPlay: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  updateFavorite: null,
};
