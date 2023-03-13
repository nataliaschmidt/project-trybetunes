import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SearchResults extends Component {
  render() {
    // console.log(this.props);
    const { artist, musics } = this.props;
    // console.log(musics);
    return (
      <>
        <h2>
          Resultado de álbuns de:
          {' '}
          {artist}
        </h2>
        {musics.length === 0 ? <h3>Nenhum álbum foi encontrado</h3>
          : (
            musics.map((music) => (
              <div key={ music.collectionId }>
                <img src={ music.artworkUrl100 } alt={ music.collectionName } />
                <Link
                  data-testid={ `link-to-album-${music.collectionId}` }
                  to={ `/album/${music.collectionId}` }
                >
                  {music.collectionName}

                </Link>
              </div>
            ))
          )}
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
