import React, { Component } from 'react';

// Top level component for actual application
class Rank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'abc'
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Rank</h1>
      </div>
    );
  }
}

export default Rank;
