import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';

import './OutStandingDoctor.scss';

class OutStandingDoctor extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="section-slider color-section">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Tìm Kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize doctor-customize">
                <div className="outer-bg">
                  <div className="bg-image outStandingDoctor-image"></div>
                </div>
                <div className="text-center position">
                  <div>Bác sĩ 1</div>
                  <div>Chức vụ X</div>
                </div>
              </div>
              <div className="section-customize doctor-customize">
                <div className="outer-bg">
                  <div className="bg-image outStandingDoctor-image"></div>
                </div>
                <div className="text-center position">
                  <div>Bác sĩ 2</div>
                  <div>Chức vụ XX</div>
                </div>
              </div>
              <div className="section-customize doctor-customize">
                <div className="outer-bg">
                  <div className="bg-image outStandingDoctor-image"></div>
                </div>
                <div className="text-center position">
                  <div>Bác sĩ 3</div>
                  <div>Chức vụ XXX</div>
                </div>
              </div>
              <div className="section-customize doctor-customize">
                <div className="outer-bg">
                  <div className="bg-image outStandingDoctor-image"></div>
                </div>
                <div className="text-center position">
                  <div>Bác sĩ 4</div>
                  <div>Chức vụ XXXX</div>
                </div>
              </div>
              <div className="section-customize doctor-customize">
                <div className="outer-bg">
                  <div className="bg-image outStandingDoctor-image"></div>
                </div>
                <div className="text-center position">
                  <div>Bác sĩ 5</div>
                  <div>Chức vụ XXXXX</div>
                </div>
              </div>
              <div className="section-customize doctor-customize">
                <div className="outer-bg">
                  <div className="bg-image outStandingDoctor-image"></div>
                </div>
                <div className="text-center position">
                  <div>Bác sĩ 6</div>
                  <div>Chức vụ XXXXXX</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
