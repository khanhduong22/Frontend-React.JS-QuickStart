import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';

import './Specialty.scss';

class Specialty extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="section-slider color-section">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image specialty-image"></div>
                <div>Cơ xương khớp 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image specialty-image"></div>
                <div>Cơ xương khớp 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image specialty-image"></div>
                <div>Cơ xương khớp 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image specialty-image"></div>
                <div>Cơ xương khớp 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image specialty-image"></div>
                <div>Cơ xương khớp 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image specialty-image"></div>
                <div>Cơ xương khớp 6</div>
              </div>
              <div className="section-customize">
                <div className="bg-image specialty-image"></div>
                <div>Cơ xương khớp 7</div>
              </div>
            </Slider>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);