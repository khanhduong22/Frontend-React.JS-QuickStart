import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSpecialty } from '../../../services/userService';
import Slider from 'react-slick';
import { withRouter } from 'react-router';

import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

class Specialty extends Component {
  state = {
    dataSpecialty: [],
  };

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res?.data?.errorCode === 0) {
      this.setState({ dataSpecialty: res.data.data });
    }
  }

  handleOnClickSpecialty = (data) => {
    this.props.history.push(`/detail-specialty/${data.id}`);
  };

  render() {
    const { dataSpecialty } = this.state;
    return (
      <div className="section-slider color-section">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.specialty" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecialty?.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      onClick={() => this.handleOnClickSpecialty(item)}
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
