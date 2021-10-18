import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomeFooter.scss';

class HomeFooter extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="text-center footer">
        <p>
          &copy; 2021 Clone by Benjamin Duong. More information, please visit me
          at
          <a href="google.com">&#8594; here &#8592;</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
