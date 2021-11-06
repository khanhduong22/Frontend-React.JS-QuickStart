import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Modal } from 'reactstrap';
import DatePicker from '../../../../../components/Input/DatePicker';
import { postPatientBookAppointment } from '../../../../../services/userService';
import * as action from '../../../../../store/actions';
import { LANGUAGES } from '../../../../../utils';
import ProfileDoctor from '../ProfileDoctor';

class BookingModal extends Component {
  state = {
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    reason: '',
    birthday: '',
    doctorId: '',
    selectedGender: '',
    timeType: '',

    genders: [],
  };

  async componentDidMount() {
    await this.props.fetchGender();
    this.setState({ genders: this.buildDataInputSelect(this.props.genders) });
    if (
      this.props.dataForBookingModal &&
      !_.isEmpty(this.props.dataForBookingModal)
    ) {
      let doctorId = this.props.dataForBookingModal.doctorId;
      let timeType = this.props.dataForBookingModal.timeType;
      this.setState({ doctorId: doctorId, timeType: timeType });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.forEach((item, index) => {
        let object = {};
        // let labelVi = `${item.lastName} ${item.firstName}`;
        // let labelEn = `${item.firstName} ${item.lastName}`;

        // object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genders !== this.props.genders) {
      this.setState({ genders: this.buildDataInputSelect(this.props.genders) });
    }
    if (this.props.language !== prevProps.language) {
      this.setState({ genders: this.buildDataInputSelect(this.props.genders) });
    }
    if (this.props.dataForBookingModal !== prevProps.dataForBookingModal) {
      if (
        this.props.dataForBookingModal &&
        !_.isEmpty(this.props.dataForBookingModal)
      ) {
        let doctorId = this.props.dataForBookingModal.doctorId;
        let timeType = this.props.dataForBookingModal.timeType;
        this.setState({ doctorId: doctorId, timeType: timeType });
      }
    }
  }

  handleOnChangeDate = (date) => {
    this.setState({ birthday: date[0] });
  };

  handleOnChangeInput = (event, state) => {
    let stateCopy = { ...this.state };
    stateCopy[state] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleChangeSelect = (selectOption) => {
    this.setState({ selectedGender: selectOption });
  };

  buildTimeBooking = (dataTime) => {
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
      return `${hour} - ${date}`;
    }
    return '';
  };

  buildDoctorName = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        this.props.language === LANGUAGES.VI
          ? `${dataTime?.doctorData?.lastName} ${dataTime?.doctorData?.firstName}`
          : `${dataTime?.doctorData?.firstName} ${dataTime?.doctorData?.lastName}`;
      return name;
    }
    return '';
  };

  handleOnConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataForBookingModal);
    let doctorName = this.buildDoctorName(this.props.dataForBookingModal);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataForBookingModal.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString,
      doctorName,
    });

    if (res.data.errorCode === 0) {
      toast.success('Booking a new  appointment success');
      this.props.closeBookingModal();
    } else {
      toast.error('Opp something wrong!');
    }
  };

  render() {
    const { isOpenModal, closeBookingModal, dataForBookingModal } = this.props;
    const { fullName, phoneNumber, email, address, reason } = this.state;
    let doctorId =
      dataForBookingModal && !_.isEmpty(dataForBookingModal)
        ? dataForBookingModal?.doctorId
        : '';

    return (
      <>
        {/* {JSON.stringify(dataForBookingModal)} */}
        {/*  toggle={closeBookingModal} */}
        <Modal
          isOpen={isOpenModal}
          toggle={() => closeBookingModal()}
          centered
          className={'booking-modal-container'}
          size="lg">
          <div className="container" style={{ height: 'fit-content' }}>
            <div className="row"></div>
            <div className="row fw-bold header mx-1 mt-3">
              <FormattedMessage id="booking-modal.title" />
            </div>
            <hr />
            <ProfileDoctor
              doctorId={doctorId}
              isShowDescription={false}
              dataTime={dataForBookingModal}
              isShowPrice={true}
            />
            <hr />

            <div className="row mt-2">
              <div className="col-6">
                <div className="row mx-1">
                  <FormattedMessage id="booking-modal.fullName" />
                </div>
                <div className="row mx-1">
                  <input
                    value={fullName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'fullName')
                    }
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="row mx-1">
                  <FormattedMessage id="booking-modal.phoneNumber" />
                </div>
                <div className="row mx-1">
                  <input
                    value={phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'phoneNumber')
                    }
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-6">
                <div className="row mx-1">
                  <FormattedMessage id="booking-modal.email" />
                </div>
                <div className="row mx-1">
                  <input
                    value={email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'email')
                    }
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="row mx-1">
                  <FormattedMessage id="booking-modal.address" />
                </div>
                <div className="row mx-1">
                  <input
                    value={address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'address')
                    }
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-12">
                <div className="row mx-1">
                  <FormattedMessage id="booking-modal.reason" />
                </div>
                <div className="row mx-1">
                  <input
                    value={reason}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'reason')
                    }
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-6">
                <div className="row mx-1">
                  <FormattedMessage id="booking-modal.birthday" />
                </div>
                <div className="row mx-1">
                  {/* <input
                    value={birthday}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'birthday')
                    }
                    className="form-control"
                  /> */}
                  <DatePicker
                    onChange={this.handleOnChangeDate}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="row mx-1">
                  <FormattedMessage id="booking-modal.gender" />
                </div>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                  className="row mx-1"
                  placeholder={<FormattedMessage id="booking-modal.gender" />}
                />
              </div>
            </div>

            <hr />
            <div className="d-flex flex-row-reverse footer-button my-2">
              <button
                onClick={() => this.handleOnConfirmBooking()}
                className="btn btn-warning mx-2">
                <FormattedMessage id="booking-modal.btnConfirm" />
              </button>
              <button
                className="btn btn-dark mx-2"
                onClick={() => closeBookingModal()}>
                <FormattedMessage id="booking-modal.btnCancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genders: state.admin.genders,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGender: () => dispatch(action.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
