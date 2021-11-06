import _ from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import { createBulkScheduleDoctor } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

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
      inputData.forEach((item, index) => {
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
    this.setState({ listDoctors: this.props.allDoctors });
    this.setState({ rangeTime: this.props.allScheduleTime });
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
      let data = this.props.allScheduleTime;
      if (data) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({ rangeTime: data });
    }
  }

  handleChangeOption = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleOnChangeDate = (date) => {
    this.setState({ currentDate: date[0] });
  };

  handleOnClickTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({ rangeTime: rangeTime });
    }
  };

  handleOnSaveScheduleButton = async () => {
    let { rangeTime, selectedOption, currentDate } = this.state;
    let result = [];

    if (selectedOption && _.isEmpty(selectedOption)) {
      toast.error('Missing doctor!');
      return;
    }
    if (!currentDate) {
      toast.error('Missing date!');
      return;
    }

    // let formateDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formateDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.forEach((item) => {
          let object = {};
          object.doctorId = selectedOption.value;
          object.date = formateDate;
          object.timeType = item.keyMap;
          result.push(object);
        });
      }
    }

    let res = await createBulkScheduleDoctor(result);
    if (res?.data?.errorCode === 0) {
      toast.success('Saved');
    } else {
      toast.error('Opps something wrong!');
      console.log(`res`, res);
    }
    console.log(`res`, res);
    console.log(`result`, result);
  };

  render() {
    const { rangeTime } = this.state;
    const { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
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
              placeholderText="Select a date after 5 days ago"
              minDate={yesterday}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            {rangeTime &&
              rangeTime.map((item, index) => {
                return (
                  <button
                    onClick={() => this.handleOnClickTime(item)}
                    className={
                      item.isSelected === true
                        ? 'btn btn-warning col me-2 my-2'
                        : 'btn btn-outline-info col me-2 my-2'
                    }
                    key={index}>
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </button>
                );
              })}
          </div>
        </div>
        <button
          onClick={() => this.handleOnSaveScheduleButton()}
          className="btn btn-primary mt-4">
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
