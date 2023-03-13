import React, { Component } from 'react';

export default class SearchResults extends Component {
  render() {
    const { search } = this.props;
    console.log(search);
    return (
      <h2>
        Resultado de álbuns de:
        {' '}
        {search}
      </h2>
    );
  }
}
