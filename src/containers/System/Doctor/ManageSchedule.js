import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

export class ManageSchedule extends Component {
  state = {
    selectedOption: {},
    listDoctors: [],
    currentDate: '',
    rangeTime: [],
  };

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
    console.log(`this.props.allScheduleTime`, this.props.allScheduleTime);
    this.setState({ listDoctors: this.props.allDoctors });
    this.setState({ rangeTime: this.props.allScheduleTime });
    console.log(`this.props.allScheduleTime`, this.props.allScheduleTime);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctors: dataSelect });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctors: dataSelect });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      this.setState({ rangeTime: this.props.allScheduleTime });
    }
  }

  handleChangeOption = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleOnChangeDate = (date) => {
    this.setState({ currentDate: date[0] });
  };

  render() {
    const { rangeTime, listDoctors } = this.state;
    const { language } = this.props;
    console.log(`rangeTime`, rangeTime);
    console.log(`listDoctors`, listDoctors);
    return (
      <div className="container mt-2">
        <div className="row my-1 text-uppercase fw-bold text-center fs-1">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="row mt-5">
          <div className="col">
            <div>
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
            </div>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeOption}
              options={this.state.listDoctors}
            />
          </div>
          <div className="col">
            <div>
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
            </div>
            <DatePicker
              onChange={this.handleOnChangeDate}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            {rangeTime &&
              rangeTime.map((item, index) => {
                return (
                  <button className="btn btn-outline-info col me-2" key={index}>
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </button>
                );
              })}
          </div>
        </div>
        <button className="btn btn-primary mt-4">
          <FormattedMessage id="manage-schedule.save" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    saveDoctorInfo: (data) => dispatch(actions.saveDoctorInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
