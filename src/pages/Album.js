import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    // console.log(this.props);
    const { match: { params: { id } } } = this.props;
    // console.log(typeof id);
    return (
      <>
        <Header />
        <div data-testid="page-album">Album</div>
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
