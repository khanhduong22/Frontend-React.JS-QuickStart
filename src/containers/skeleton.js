import React, { Component } from 'react';
import { connect } from 'react-redux';

class Skeleton extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return <div className="text-center">This is for skeleton </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Skeleton);
