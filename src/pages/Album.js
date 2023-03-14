import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musicsOfId: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    // console.log(musics);
    this.setState({
      musicsOfId: musics,
    });
  }

  render() {
    // console.log(this.props);
    // const { match: { params: { id } } } = this.props;
    // console.log(typeof id);
    const { musicsOfId } = this.state;
    const newMusicsArray = musicsOfId.slice(1);
    // console.log(newMusicsArray);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h2 data-testid="artist-name">{ musicsOfId[0]?.artistName }</h2>
          <h2 data-testid="album-name">{ musicsOfId[0]?.collectionName }</h2>
          {
            newMusicsArray.map((music) => (
              <MusicCard
                key={ music.trackName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                musicObj={ music }
              />
            ))
          }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

// O '?' permite verificar se uma propriedade existe no objeto antes de acessar ela, caso o valor da chave que está tentando acessar seja null ou undefined a expressão toda passa para undefined no lugar de gerar um erro. Chama-se Operador de acesso seguro (vimos na mentoria dos Summers).
