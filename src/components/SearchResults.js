import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/SearchResults.css';

export default class SearchResults extends Component {
  render() {
    // console.log(this.props);
    const { artist, musics } = this.props;
    // console.log(musics);
    return (
      <>
        <h2 className="result">
          Resultado de álbuns de:
          {' '}
          {artist}
        </h2>
        <div className="container-result">
          {musics.length === 0 ? <h3>Nenhum álbum foi encontrado</h3>
            : (
              musics.map((music) => (

                <div key={ music.collectionId } className="container-albuns">
                  <Link
                    className="link-result"
                    data-testid={ `link-to-album-${music.collectionId}` }
                    to={ `/album/${music.collectionId}` }
                  >
                    <img src={ music.artworkUrl100 } alt={ music.collectionName } />
                    <h5>{music.collectionName}</h5>
                  </Link>
                  <h6>{music.artistName}</h6>
                </div>
              ))
            )}
        </div>
      </>
    );
  }
}

SearchResults.propTypes = {
  artist: PropTypes.string.isRequired,
  musics: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artisName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  })).isRequired, // adicionando isRequired aqui
};
