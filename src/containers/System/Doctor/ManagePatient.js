import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from '../../../components/Input/DatePicker';
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';

class ManagePatient extends Component {
  state = {
    currentDate: new Date(),
    dataPatient: [],
    isOpenRemedyModal: false,
    dataModal: {},
  };

  async componentDidMount() {
    const { user } = this.props;
    const { currentDate } = this.state;
    let formattedDate = moment(currentDate).startOf('days').valueOf();
    this.getDataPatient(user, formattedDate);
  }

  getDataPatient = async (user, formattedDate) => {
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res?.data?.errorCode === 0) {
      this.setState({ dataPatient: res.data.data });
    }
  };

  handleOnChangeDate = (date) => {
    this.setState({ currentDate: date[0] }, () => {
      const { user } = this.props;
      const { currentDate } = this.state;
      let formattedDate = moment(currentDate).startOf('days').valueOf();
      this.getDataPatient(user, formattedDate);
    });
  };

  handleOnClickConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({ isOpenRemedyModal: true, dataModal: data });
    console.log(`this.state`, this.state);
  };

  handleOnClickSend = () => {};

  handleCloseRemedyModal = () => {
    this.setState({ isOpenRemedyModal: false, dataModal: {} });
  };

  handleSendRemedy = async (dataFromRemedyModal) => {
    let { dataModal, currentDate } = this.state;
    let formattedDate = moment(currentDate).startOf('days').valueOf();

    let res = await postSendRemedy({
      email: dataFromRemedyModal.email,
      imageBase64: dataFromRemedyModal.imageBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
    });
    if (res?.data?.errorCode === 0) {
      toast.success('OK');
      let res = await getAllPatientForDoctor({
        doctorId: dataModal.doctorId,
        date: formattedDate,
      });
      if (res?.data?.errorCode === 0) {
        this.setState({ dataPatient: res.data.data });
      }
      this.handleCloseRemedyModal();
    } else {
      toast.error('ERROR!!!!!');
    }
    console.log(`res`, res);
  };

  render() {
    const { currentDate, dataPatient, isOpenRemedyModal, dataModal } =
      this.state;
    console.log(`this.state`, this.state);
    return (
      <>
        <div className="container">
          <div className="title text-center fs-3 fw-bold row">
            <div>This is for ManagePatient</div>
          </div>
          <div className="col-4 form-group">
            <label className="">Chon ngay kham</label>
            <DatePicker
              onChange={this.handleOnChangeDate}
              className="form-control"
              value={currentDate}
              placeholderText="Select a date after 5 days ago"
              //   minDate={yesterday}
            />
          </div>
          <table className="table table-striped table-hover mt-3">
            <tbody>
              <tr className="text-center">
                <th>STT</th>
                <th>Thời gian</th>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Giới tính</th>
                <th>Hành động</th>
              </tr>
              {dataPatient?.length > 0 ? (
                dataPatient.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{item.timeTypeDataPatient.valueVi}</td>
                      <td>{item.patientData.firstName}</td>
                      <td>{item.patientData.address}</td>
                      <td>{item.patientData.genderData.valueVi}</td>
                      <td className="form-group">
                        <button
                          onClick={() => this.handleOnClickConfirm(item)}
                          className="btn btn-primary me-3">
                          Xác nhận
                        </button>
                        <button
                          onClick={() => this.handleOnClickSend()}
                          className="btn btn-warning">
                          Gửi hóa đơn
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center fw-bold">
                    Không có lịch nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          dataModal={dataModal}
          closeRemedyModal={this.handleCloseRemedyModal}
          sendRemedy={this.handleSendRemedy}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
