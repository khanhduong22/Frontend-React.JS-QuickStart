import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandleBook from './Section/HandleBook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';

import './HomePage.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class HomePage extends Component {
  state = {
    settings: {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    },
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <HomeHeader />
        <Specialty settings={this.state.settings} />
        <MedicalFacility settings={this.state.settings} />
        <OutStandingDoctor settings={this.state.settings} />
        <HandleBook settings={this.state.settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
