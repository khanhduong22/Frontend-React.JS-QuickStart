import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScheduleDoctorByDate } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import './DoctorSchedule.scss';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {
  state = { allDays: [], allAvailableTime: [] };

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
          .format('dddd - DD/DD');
        object.label = this.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date())
          .add(index, 'days')
          .locale('en')
          .format('dddd - DD/DD');
      }
      object.value = moment(new Date())
        .add(index, 'days')
        .startOf('days')
        .valueOf();

      arrDate.push(object);
    }

    this.setState({ allDays: arrDate });
    console.log(`this.state.allDays`, this.state.allDays);
  };

  async componentDidMount() {
    const { doctorIdFromParent } = this.props;
    const { allDays } = this.state;
    this.initArrayDate();

    let res = await getScheduleDoctorByDate(doctorIdFromParent, allDays[0]);
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
        console.log(`allAvailableTime`, this.state.allAvailableTime);
      }
    }
  }

  handleOnChangeDate = async (event) => {
    const { doctorIdFromParent } = this.props;
    if (doctorIdFromParent && doctorIdFromParent !== -1) {
      let doctorId = doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log(`res data`, res.data.info.data);
      console.log(`res`, res);
      if (res?.data?.info?.errorCode === 0) {
        this.setState({ allAvailableTime: res.data.info.data });
        console.log(`allAvailableTime`, this.state.allAvailableTime);
      }
    }
  };

  render() {
    const { allDays, allAvailableTime } = this.state;
    const { language } = this.props;
    return (
      <div className="doctor-schedule-container ">
        <select
          className="time-selector form-select mt-4 border-0 border-bottom border-3 ms-2"
          onChange={(event) => this.handleOnChangeDate(event)}
        >
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
                  >
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
