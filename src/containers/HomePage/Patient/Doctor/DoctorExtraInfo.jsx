import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../../utils';

import { getExtraInfoDoctorByDoctorId } from '../../../../services/userService';

class DoctorExtraInfo extends Component {
  state = {
    isShowDetail: false,
    extraInfo: {},
  };
  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let { doctorIdFromParent } = this.props;
      let res = await getExtraInfoDoctorByDoctorId(doctorIdFromParent);
      if (res?.data?.errorCode === 0) {
        this.setState({ extraInfo: res.data.data });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }

    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      let { doctorIdFromParent } = this.props;
      let res = await getExtraInfoDoctorByDoctorId(doctorIdFromParent);
      if (res?.data?.errorCode === 0) {
        this.setState({ extraInfo: res.data.data });
      }
    }
  }

  showDetail = (status) => {
    this.setState({ isShowDetail: status });
  };

  render() {
    const { language } = this.props;
    const { isShowDetail, extraInfo } = this.state;
    return (
      <div className="doctor-extra-info-container container">
        <div className="row up-content">
          <div className="row title fs-4">
            <FormattedMessage id="patient.detail-doctor.address" />
          </div>
          <div className="row name-clinic fw-bold">
            {extraInfo?.nameClinic ? extraInfo.nameClinic : ''}
          </div>
          <div className="row address-clinic">
            {extraInfo?.addressClinic ? extraInfo.addressClinic : ''}
          </div>
        </div>
        <hr />

        {!isShowDetail && (
          <div className="row down-content">
            <div className="row">
              <span className="col-10">
                <FormattedMessage id="patient.detail-doctor.price" />
              </span>
              <span className="col-2">
                {language === LANGUAGES.VI ? (
                  <NumberFormat
                    value={extraInfo?.priceData?.valueVi}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'đ'}
                  />
                ) : (
                  <NumberFormat
                    value={extraInfo?.priceData?.valueEn}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'$'}
                  />
                )}
              </span>
            </div>
            <div
              className="row click-to-detail"
              onClick={() => this.showDetail(true)}>
              <FormattedMessage id="patient.detail-doctor.detail" />
            </div>
          </div>
        )}

        {isShowDetail && (
          <div className="row down-content ">
            <div className="row price p-0 ms-1">
              <span className="col">
                <FormattedMessage id="patient.detail-doctor.price" />
              </span>
            </div>
            <div className="row box-up p-0 ms-1">
              <div className="row price-in-box">
                <span className="col-10">
                  <FormattedMessage id="patient.detail-doctor.price" />
                </span>
                <span className="col-2">
                  {language === LANGUAGES.VI ? (
                    <NumberFormat
                      value={extraInfo?.priceData?.valueVi}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={'đ'}
                    />
                  ) : (
                    <NumberFormat
                      value={extraInfo?.priceData?.valueEn}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={'$'}
                    />
                  )}
                </span>
              </div>
              <div className="row note">
                {extraInfo?.note ? extraInfo.note : ''}
              </div>
            </div>
            <div className="row box-down p-0 ms-1">
              <span>
                <FormattedMessage id="patient.detail-doctor.payment-method" />

                {extraInfo?.paymentData?.valueVi
                  ? extraInfo.paymentData.valueVi
                  : ''}
              </span>
            </div>
            <div
              className="row click-to-detail"
              onClick={() => this.showDetail(false)}>
              <FormattedMessage id="patient.detail-doctor.hide-price-table" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
