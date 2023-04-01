import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/Album.css';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    musicsOfId: [],
    isMusicPlay: false,
    isLoading: false,
  };

  async componentDidMount() {
    console.log(this.props);
    const { match: { params: { id } } } = this.props;
    this.setState({
      isLoading: true,
    });
    const musics = await getMusics(id);
    console.log(musics);
    this.setState({
      musicsOfId: musics,
      isLoading: false,
    });
  }

  // ALTERANDO O CODIGO!!!

  handleMusicPlay = (isMusicPlay) => {
    this.setState({
      isMusicPlay,
    });
  };

  render() {
    // console.log(this.props);
    // const { match: { params: { id } } } = this.props;
    // console.log(typeof id);
    const { musicsOfId, isLoading, isMusicPlay } = this.state;
    console.log(musicsOfId);
    const newMusicsArray = musicsOfId.slice(1);
    if (isLoading) return <Loading />;
    // console.log(newMusicsArray);
    return (
      <div className="container-search">
        <div className="container-header-search">
          <Header className="header" />
        </div>
        <div data-testid="page-album" className="container-form-result album">
          <div className="container-form-search">
            {musicsOfId.length > 0 && (
              <>
                <div className="container-infos-album">
                  <img
                    src={ musicsOfId[0]?.artworkUrl100 }
                    alt="Imagem da capa do álbum"
                  />
                </div>
                <div className="container-vinil">
                  <div className={ `vinil ${isMusicPlay ? 'turn-vinil' : ''}` }>
                    <img
                      className="img-vinil"
                      src={ musicsOfId[0]?.artworkUrl100 }
                      alt="Imagem da capa do álbum"
                    />
                    <div className="vinil-hole" />
                  </div>
                </div>
              </>
            ) }
            <div className="container-disc-infos">
              <h2 data-testid="album-name">{musicsOfId[0]?.collectionName}</h2>
              <h2 data-testid="artist-name">{musicsOfId[0]?.artistName}</h2>
            </div>
          </div>
          <div className="container-music">
            <MusicCard arrayMusic={ newMusicsArray } musicPlay={ this.handleMusicPlay } />
          </div>
        </div>
      </div>
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
