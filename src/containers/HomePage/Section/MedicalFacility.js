import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllClinic } from '../../../services/userService';
import Slider from 'react-slick';
import { withRouter } from 'react-router';

import './MedicalFacility.scss';

class MedicalFacility extends Component {
  state = { dataClinics: [] };

  async componentDidMount() {
    let res = await getAllClinic();
    if (res?.data?.errorCode === 0) {
      this.setState({ dataClinics: res.data.data });
    }
  }

  handleOnClickClinic = (data) => {
    this.props.history.push(`/detail-clinic/${data.id}`);
  };

  render() {
    const { dataClinics } = this.state;
    return (
      <div className="section-slider ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinics?.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      onClick={() => this.handleOnClickClinic(item)}
                      className="section-customize"
                      key={index}>
                      <div
                        className="bg-image specialty-image"
                        style={{ backgroundImage: `url(${item.image}` }}></div>
                      <div>{item.name}</div>
                    </div>
                  );
                })}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
