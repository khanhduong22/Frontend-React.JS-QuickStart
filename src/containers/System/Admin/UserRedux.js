import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import * as actions from '../../../store/actions';

import { LANGUAGES } from '../../../utils';

class UserRedux extends Component {
  state = {
    genderArr: [],
    positionArr: [],
    roleArr: [],
    previewImgURL: '',
    isOpen: false,
  };

  // async componentDidMount() {
  //   try {
  //     let res = await getAllCodeService('gender');
  //     if (res?.data?.errorCode === 0) {
  //       this.setState({ genderArr: res.data.data });
  //     }
  //   } catch (error) {
  //     console.log(`error: `, error);
  //   }
  // }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({ genderArr: this.props.genderRedux });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({ positionArr: this.props.positionRedux });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({ roleArr: this.props.roleRedux });
    }
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      console.log(`objectUrl`, objectUrl);
      this.setState({ previewImgURL: objectUrl });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;

    this.setState({ isOpen: true });
  };

  renderOption = (object) => {
    let genderArr = object;
    let { language } = this.props;
    return (
      genderArr &&
      genderArr.length > 0 &&
      genderArr.map((item, index) => {
        return (
          <option key={index}>
            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
          </option>
        );
      })
    );
  };

  render() {
    let { isLoadingGender } = this.props;
    const { isOpen, previewImgURL } = this.state;

    return (
      <div className="container mt-4">
        <form>
          <div className="row">
            {isLoadingGender === true ? (
              <div className="spinner-border " role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="row">
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.email" />
              </label>
              <input type="email" className="form-control" />
            </div>

            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.password" />
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
              />
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.first-name" />
              </label>
              <input type="email" className="form-control" />
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.last-name" />
              </label>
              <input type="email" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md 3">
              <label>
                <FormattedMessage id="manage-user.phone-number" />
              </label>
              <input type="text" className="form-control" id="inputAddress" />
            </div>
            <div className="form-group col-md-9">
              <label>
                <FormattedMessage id="manage-user.address" />
              </label>
              <input type="text" className="form-control" id="inputAddress2" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label>
                <FormattedMessage id="manage-user.gender" />
              </label>
              <select className="form-control">
                <option>Choose...</option>
                {this.renderOption(this.state.genderArr)}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.position" />
              </label>
              <select className="form-control">
                <option defaultValue>Choose...</option>
                {this.renderOption(this.state.positionArr)}
              </select>
            </div>
            <div className="form-group col-md-3">
              <FormattedMessage id="manage-user.role" />
              <label> </label>
              <select className="form-control">
                <option defaultValue>Choose...</option>
                {this.renderOption(this.state.roleArr)}
              </select>
            </div>

            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.image" />
              </label>
              <div className="preview-image-container">
                {/* <div className="upload-icon"> */}
                <input
                  type="file"
                  hidden
                  onChange={(event) => this.handleOnChangeImage(event)}
                  id="previewImage"
                />
                <label className="label-upload" htmlFor="previewImage">
                  <FormattedMessage id="manage-user.upload-image" />
                  <i className="fas fa-upload"></i>
                </label>
                {/* </div> */}
                <div
                  className="label-image"
                  style={{
                    backgroundImage: `url(${this.state.previewImgURL})`,
                  }}
                  onClick={() => this.openPreviewImage()}
                ></div>
              </div>
            </div>
          </div>

          <div className="form-group"></div>
          <button type="submit" className="btn btn-primary mt-4">
            <FormattedMessage id="manage-user.save" />
          </button>
        </form>
        {isOpen && (
          <Lightbox
            mainSrc={previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
