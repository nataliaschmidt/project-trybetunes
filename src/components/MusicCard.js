import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    checked:false,
  };

  fethAddSong = async (musicObj) => {
    this.setState({
      isLoading: true,
    });
    await addSong(musicObj);
    this.setState({
      isLoading: false,
      checked: true,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, musicObj } = this.props;
    const { isLoading, checked } = this.state;
    // console.log(musicObj);
    if (isLoading) return <Loading />;
    return (
      <div>
        <h2>{trackName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
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
            data-testid={ `checkbox-music-${trackId}` }
            id="favorite"
            type="checkbox"
            name="favorite"
            // disabled={  }
            checked={ checked }
            onChange={ () => this.fethAddSong(musicObj) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
