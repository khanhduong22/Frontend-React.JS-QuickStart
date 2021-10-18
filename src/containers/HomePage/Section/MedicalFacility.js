import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';

import './MedicalFacility.scss';

class MedicalFacility extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="section-slider ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image medicalFacility-image"></div>
                <div>Bệnh viện 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medicalFacility-image"></div>
                <div>Bệnh viện 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medicalFacility-image"></div>
                <div>Bệnh viện 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medicalFacility-image"></div>
                <div>Bệnh viện 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medicalFacility-image"></div>
                <div>Bệnh viện 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medicalFacility-image"></div>
                <div>Bệnh viện 6</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medicalFacility-image"></div>
                <div>Bệnh viện 7</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
