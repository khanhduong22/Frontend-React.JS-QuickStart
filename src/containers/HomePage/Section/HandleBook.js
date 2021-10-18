import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';

import './HandleBook.scss';

class HandleBook extends Component {
  state = {};

  componentDidMount() {}

  render() {
    let settings = { ...this.props.settings, slidesToShow: 2 };
    return (
      <div className="section-slider">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section">Tất cả bài viết</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="section-customize">
                <div className="bg-image HandleBook-image"></div>
                <div>Cơ xương khớp 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image HandleBook-image"></div>
                <div>Cơ xương khớp 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image HandleBook-image"></div>
                <div>Cơ xương khớp 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image HandleBook-image"></div>
                <div>Cơ xương khớp 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image HandleBook-image"></div>
                <div>Cơ xương khớp 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image HandleBook-image"></div>
                <div>Cơ xương khớp 6</div>
              </div>
              <div className="section-customize">
                <div className="bg-image HandleBook-image"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandleBook);
