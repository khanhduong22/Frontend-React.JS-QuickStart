import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import TableManageUser from './TableManageUser';
import './UserRedux.scss';

class UserRedux extends Component {
  state = {
    genderArr: [],
    positionArr: [],
    roleArr: [],
    previewImgURL: '',
    isOpen: false,

    email: '',
    password: '',
    firstName: '',
    lastName: '',

    phoneNumber: '',
    address: '',

    gender: '',
    position: '',
    role: '',
    isSelected: false,

    avatar: '',

    isEdit: false,
    id: '',
  };

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
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',

        phoneNumber: '',
        address: '',

        gender: '',
        position: '',
        role: '',

        avatar: '',
      });
    }
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      console.log(`objectUrl`, objectUrl);
      this.setState({ previewImgURL: objectUrl, avatar: file });
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
          <option key={item.key} value={item.key}>
            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
          </option>
        );
      })
    );
  };

  onChangeInput = (event, id) => {
    let dataState = { ...this.state };
    dataState[id] = event.target.value;
    this.setState({
      ...dataState,
    });
  };

  handleSaveUser = (event) => {
    event.preventDefault();
    console.log(`this.state.edit1111`, this.state.isEdit);

    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    if (this.state.isEdit === true) {
      //fire action edit on Redux
      console.log(`this.state.edit`, this.state.isEdit);
      this.props.editUser({
        id: this.state.id,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      });
      this.setState({ isEdit: false });
    } else {
      this.props.createUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      });
      this.setState({ isSelected: true });
    }
    // toast.success('Create user success!!');
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      'email',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'address',
    ];
    for (let index = 0; index < arrCheck.length; index++) {
      if (!this.state[arrCheck[index]]) {
        isValid = false;
        alert('Required this input: ' + arrCheck[index]);
        break;
      }
    }

    return isValid;
  };

  handleEditUser = (user) => {
    this.setState({
      email: user.email,
      password: 'NOT_SHOW',
      firstName: user.firstName,
      lastName: user.lastName,

      phoneNumber: user.phoneNumber,
      address: user.address,

      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      id: user.id,

      isEdit: true,
    });
  };

  render() {
    let { isLoadingGender } = this.props;
    const {
      isOpen,
      previewImgURL,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,

      isEdit,
    } = this.state;

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
              <input
                type="text"
                className="form-control"
                value={email}
                disabled={isEdit}
                onChange={(event) => this.onChangeInput(event, 'email')}
              />
            </div>

            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.password" />
              </label>
              <input
                type="password"
                disabled={isEdit}
                className="form-control"
                id="inputPassword4"
                value={password}
                onChange={(event) => this.onChangeInput(event, 'password')}
              />
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.first-name" />
              </label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(event) => this.onChangeInput(event, 'firstName')}
              />
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.last-name" />
              </label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(event) => this.onChangeInput(event, 'lastName')}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md 3">
              <label>
                <FormattedMessage id="manage-user.phone-number" />
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                value={phoneNumber}
                onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
              />
            </div>
            <div className="form-group col-md-9">
              <label>
                <FormattedMessage id="manage-user.address" />
              </label>
              <input
                value={address}
                onChange={(event) => this.onChangeInput(event, 'address')}
                type="text"
                className="form-control"
                id="inputAddress2"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label>
                <FormattedMessage id="manage-user.gender" />
              </label>
              <select
                className="form-control"
                value={gender}
                onChange={(event) => this.onChangeInput(event, 'gender')}
              >
                <option selected={this.state.isSelected}>Choose...</option>
                {this.renderOption(this.state.genderArr)}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.position" />
              </label>
              <select
                className="form-control"
                value={position}
                onChange={(event) => this.onChangeInput(event, 'position')}
              >
                <option selected={this.state.isSelected}>Choose...</option>
                {this.renderOption(this.state.positionArr)}
              </select>
            </div>
            <div className="form-group col-md-3">
              <FormattedMessage id="manage-user.role" />
              <label> </label>
              <select
                className="form-control"
                value={role}
                onChange={(event) => this.onChangeInput(event, 'role')}
              >
                <option selected={this.state.isSelected}>Choose...</option>
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
          <button
            onClick={(event) => this.handleSaveUser(event)}
            className={isEdit ? 'mt-4 btn btn-warning' : 'mt-4 btn btn-primary'}
          >
            {isEdit ? (
              <FormattedMessage id="manage-user.edit" />
            ) : (
              <FormattedMessage id="manage-user.save" />
            )}
          </button>
        </form>
        {isOpen && (
          <Lightbox
            mainSrc={previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}

        <TableManageUser handleEditUser={this.handleEditUser} />
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
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createUser: (data) => dispatch(actions.createUser(data)),
    fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    editUser: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
