import moment from 'moment';
import BookingModal from '../Doctor/Modal/BookingModal';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScheduleDoctorByDate } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import './DoctorSchedule.scss';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi';

class DoctorSchedule extends Component {
  state = {
    allDays: [],
    allAvailableTime: [],
    isOpenBookingModal: false,
    dataForBookingModal: {},
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  initArrayDate = () => {
    const TOTAL_DAY_OF_WEEK = 7;
    let arrDate = [];
    for (let index = 0; index < TOTAL_DAY_OF_WEEK; index++) {
      let object = {};
      if (this.props.language === LANGUAGES.VI) {
        let labelVi = moment(new Date())
          .add(index, 'days')
          .format('dddd - DD/MM');
        object.label = this.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date())
          .add(index, 'days')
          .locale('en')
          .format('dddd - MMM DD');
      }
      object.value = moment(new Date())
        .add(index, 'days')
        .startOf('days')
        .valueOf();

      arrDate.push(object);
    }

    this.setState({ allDays: arrDate });
  };

  async componentDidMount() {
    const { doctorIdFromParent } = this.props;
    // const { allDays } = this.state;
    this.initArrayDate();

    let res = await getScheduleDoctorByDate(
      doctorIdFromParent,
      moment(new Date()).add('days').startOf('days').valueOf()
    );
    if (res?.data?.info?.errorCode === 0) {
      this.setState({ allAvailableTime: res.data.info.data });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.initArrayDate();
    }
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      const { doctorIdFromParent } = this.props;
      const { allDays } = this.state;
      let res = await getScheduleDoctorByDate(
        doctorIdFromParent,
        allDays[0].value
      );
      if (res?.data?.info?.errorCode === 0) {
        this.setState({ allAvailableTime: res.data.info.data });
      }
    }
  }

  handleOnChangeDate = async (event) => {
    const { doctorIdFromParent } = this.props;
    if (doctorIdFromParent && doctorIdFromParent !== -1) {
      let doctorId = doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res?.data?.info?.errorCode === 0) {
        this.setState({ allAvailableTime: res.data.info.data });
      }
    }
  };

  handleOnClickTime = (time) => {
    this.setState({ isOpenBookingModal: true, dataForBookingModal: time });
  };

  handleCloseBookingModal = () => {
    this.setState({ isOpenBookingModal: false });
  };

  render() {
    const {
      allDays,
      allAvailableTime,
      isOpenBookingModal,
      dataForBookingModal,
    } = this.state;
    const { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container ">
          <select
            className="time-selector form-select mt-4 border-0 border-bottom border-3 ms-2"
            onChange={(event) => this.handleOnChangeDate(event)}>
            {allDays &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
          <div className="row">
            <span className="mt-2">
              <i className="fas fa-calendar-alt ms-2">
                &nbsp;
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </i>
            </span>
            <div className="container time-content mt-2">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <button
                      key={index}
                      className="time-button btn btn-warning mx-2 my-2"
                      onClick={() => this.handleOnClickTime(item)}>
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <div className="ms-2">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenBookingModal}
          dataForBookingModal={dataForBookingModal}
          closeBookingModal={this.handleCloseBookingModal}
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
