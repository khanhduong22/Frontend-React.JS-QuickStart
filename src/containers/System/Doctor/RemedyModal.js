import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CommonUtils from '../../../utils/CommonUtils';

class RemedyModal extends Component {
  state = { email: '', imageBase64: '' };

  componentDidMount() {
    const { dataModal } = this.props;

    if (dataModal) {
      this.setState({ email: dataModal.email });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataModal } = this.props;
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({ email: dataModal.email });
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      console.log(`objectUrl`, objectUrl);
      this.setState({ imageBase64: base64 });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    const { isOpenModal, closeRemedyModal, dataModal, language, sendRemedy } =
      this.props;
    const { email } = this.state;
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          toggle={() => closeRemedyModal()}
          centered
          className={'booking-modal-container'}
          size="lg">
          <ModalHeader toggle={() => closeRemedyModal()}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Email bệnh nhân</label>
                  <input
                    onChange={(event) => this.handleOnChangeEmail(event)}
                    className="form-control"
                    type="email"
                    value={email}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Chọn file đơn thuốc</label>
                  <input
                    onChange={(event) => this.handleOnChangeImage(event)}
                    className="form-control-file"
                    type="file"
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => this.handleSendRemedy()}>
              Gửi
            </button>{' '}
            <Button onClick={() => closeRemedyModal()}>Hủy</Button>
          </ModalFooter>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
