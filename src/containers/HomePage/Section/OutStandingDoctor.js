import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './OutStandingDoctor.scss';

import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class OutStandingDoctor extends Component {
  state = { arrDoctors: [] };

  async componentDidMount() {
    await this.props.loadTopDoctors();
    await this.setState({ arrDoctors: this.props.topDoctorsRedux });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  render() {
    let { arrDoctors } = this.state;
    const { language } = this.props;

    console.log(`arrDoctors`, arrDoctors);
    return (
      <div className="section-slider color-section">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors.map((item, index) => {
                let imageBase64 = '';
                if (item.image) {
                  imageBase64 = new Buffer(item.image, 'base64').toString(
                    'binary'
                  );
                }
                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div
                    className="section-customize doctor-customize"
                    key={index}
                  >
                    <div className="outer-bg">
                      <div
                        className="bg-image outStandingDoctor-image"
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                        }}
                      ></div>
                    </div>
                    <div className="text-center position">
                      <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                      <div>Chức vụ X</div>
                    </div>
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
  return {
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
