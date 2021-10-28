import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { getProfileDoctorById } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import './ProfileDoctor.scss';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
  state = { dataProfile: {} };

  async componentDidMount() {
    let id = this.props.doctorId;
    if (id) {
      let res = await getProfileDoctorById(id);
      this.setState({ dataProfile: res.data.data });
    }
  }

  renderTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let hour =
        this.props.language === LANGUAGES.VI
          ? dataTime?.timeTypeData?.valueVi
          : dataTime?.timeTypeData?.valueEn;
      let date =
        this.props.language === LANGUAGES.VI
          ? moment
              .unix(+dataTime.date / 1000)
              .locale('vi')
              .format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale('en')
              .format('ddd - MM/DD/YYYY');
      return (
        <>
          <div>{`${hour} - ${date}`}</div>
          <div>
            <FormattedMessage id="booking-modal.priceBooking" />
          </div>
        </>
      );
    }
  };

  render() {
    const { dataProfile } = this.state;
    const { language, dataTime } = this.props;
    let nameVi = '',
      nameEn = '';
    if (dataProfile?.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <>
        <div className="row profile-doctor">
          <div className="col-2 mt-2 content-left">
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${dataProfile?.image}`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '80px',
                width: '80px',
                borderRadius: '50%',
              }}
            ></div>
          </div>
          <div className="col-10 content-right text-start">
            <div className="row up fw-bold fs-5 text-uppercase">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            {this.props.isShowDescription ? (
              <div className="row down mt-auto text-start">
                {dataProfile?.Markdown && (
                  <span>{dataProfile?.Markdown?.description}</span>
                )}
              </div>
            ) : (
              <> {this.renderTimeBooking(dataTime)}</>
            )}
          </div>
        </div>
        <div className="row">
          <span>
            <FormattedMessage id="patient.detail-doctor.price" />
            {language === LANGUAGES.VI ? (
              <NumberFormat
                value={dataProfile?.Doctor_Info?.priceData?.valueVi}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'đ'}
              />
            ) : (
              <NumberFormat
                value={dataProfile?.Doctor_Info?.priceData?.valueEn}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'$'}
              />
            )}
          </span>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
