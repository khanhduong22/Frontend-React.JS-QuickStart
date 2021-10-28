import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postVerifyBookAppointment } from '../../../services/userService';
import HomeHeader from '../HomeHeader';
import './VerifyEmail.scss';

class VerifyEmail extends Component {
  state = {
    statusVerify: false,
    errorCode: 0,
  };

  async componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location?.search);
    const token = urlParams.get('token');
    const doctorId = urlParams.get('doctorId');
    let res = await postVerifyBookAppointment({
      token,
      doctorId,
    });
    if (res?.data?.errorCode === 0) {
      this.setState({ statusVerify: true });
    } else {
      this.setState({ statusVerify: true, errorCode: -1 });
    }
  }

  render() {
    const { statusVerify, errorCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="d-flex justify-content-center align-content-center flex-column vh-100">
          {statusVerify ? (
            errorCode === 0 ? (
              <div className="text-center text-uppercase fw-bold fs-3 text-success">
                The schedule is verified
              </div>
            ) : (
              <div className="text-center text-uppercase fw-bold fs-3 text-danger">
                Da xac nhan hoac khong ton tai, vui long kiem tra lai
              </div>
            )
          ) : (
            <div className="text-center text-uppercase fw-bold fs-3">
              Loading....
            </div>
          )}
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

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
