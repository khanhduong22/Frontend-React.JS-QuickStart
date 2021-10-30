import MarkdownIt from 'markdown-it';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getDetailDoctorInfo } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import './ManagerDoctor.scss';

const mdParser = new MarkdownIt();

class ManagerDoctor extends Component {
  state = {
    contentHTML: '',
    contentMarkdown: '',
    description: '',
    selectedOption: {},
    listDoctors: [],
    hasOldData: false,

    //*save to doctor_info table
    listPrice: [],
    listPayment: [],
    listProvince: [],
    listClinic: [],
    listSpecialty: [],

    selectedPrice: [],
    selectedPayment: [],
    selectedProvince: [],
    selectedClinic: [],
    selectedSpecialty: [],

    nameClinic: '',
    addressClinic: '',
    note: '',
    clinicId: '',
    specialtyId: '',
  };

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfo();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (type === 'NoEng') {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    } else {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          let labelVi =
            type === 'USERS'
              ? `${item.lastName} ${item.firstName}`
              : `${item.valueVi}`;
          let labelEn =
            type === 'USERS'
              ? `${item.firstName} ${item.lastName}`
              : `${item.valueEn}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = type === 'USERS' ? item.id : item.keyMap;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        'USERS'
      );
      this.setState({ listDoctors: dataSelect });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        'USERS'
      );
      this.setState({ listDoctors: dataSelect });
      const { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;

      let dataSelectedPrice = this.buildDataInputSelect(resPrice);
      let dataSelectedPayment = this.buildDataInputSelect(resPayment);
      let dataSelectedProvince = this.buildDataInputSelect(resProvince);
      let dataSelectedSpecialty = this.buildDataInputSelect(
        resSpecialty,
        'NoEng'
      );
      let dataSelectedClinic = this.buildDataInputSelect(resClinic, 'NoEng');

      this.setState({
        listPrice: dataSelectedPrice,
        listPayment: dataSelectedPayment,
        listProvince: dataSelectedProvince,
        listSpecialty: dataSelectedSpecialty,
        listClinic: dataSelectedClinic,
      });
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      const { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;

      let dataSelectedPrice = this.buildDataInputSelect(resPrice);
      let dataSelectedPayment = this.buildDataInputSelect(resPayment);
      let dataSelectedProvince = this.buildDataInputSelect(resProvince);
      let dataSelectedSpecialty = this.buildDataInputSelect(
        resSpecialty,
        'NoEng'
      );
      let dataSelectedClinic = this.buildDataInputSelect(resClinic, 'NoEng');

      this.setState({
        listPrice: dataSelectedPrice,
        listPayment: dataSelectedPayment,
        listProvince: dataSelectedProvince,
        listSpecialty: dataSelectedSpecialty,
        listClinic: dataSelectedClinic,
      });
    }
  }

  handleOnEditChange = ({ text, html }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChangeOption = async (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({
      contentHTML: '',
      contentMarkdown: '',
      description: '',
      hasOldData: false,
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      nameClinic: '',
      addressClinic: '',
      note: '',
    });
    let res = await getDetailDoctorInfo(selectedOption.value);
    if (res?.data?.data?.Markdown) {
      let markdown = res.data.data.Markdown;

      let doctor_info = res.data.data.Doctor_Info;
      let selectedPrice = '';
      let selectedPayment = '';
      let selectedProvince = '';
      let selectedSpecialty = '';
      let selectedClinic = '';

      let nameClinic = '';
      let addressClinic = '';
      let note = '';

      let priceId = '';
      let paymentId = '';
      let provinceId = '';
      let specialtyId = '';
      let clinicId = '';
      const {
        listPrice,
        listPayment,
        listProvince,
        listSpecialty,
        listClinic,
      } = this.state;

      if (doctor_info) {
        priceId = doctor_info.priceId;
        paymentId = doctor_info.paymentId;
        provinceId = doctor_info.provinceId;
        specialtyId = doctor_info.specialtyId;
        clinicId = doctor_info.clinicId;

        nameClinic = doctor_info.nameClinic;
        addressClinic = doctor_info.addressClinic;
        note = doctor_info.note;

        selectedPrice = listPrice.find((item) => {
          return item?.value === priceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item?.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item?.value === provinceId;
        });

        selectedSpecialty = listSpecialty.find((item) => {
          return item?.value === specialtyId;
        });

        selectedClinic = listClinic.find((item) => {
          return item?.value === clinicId;
        });
      }

      if (
        markdown.contentHTML &&
        markdown.contentMarkdown &&
        markdown.description
      ) {
        this.setState({
          contentHTML: markdown.contentHTML,
          contentMarkdown: markdown.contentMarkdown,
          description: markdown.description,
          hasOldData: true,

          selectedPrice,
          selectedPayment,
          selectedProvince,
          selectedSpecialty,
          selectedClinic,

          nameClinic,
          addressClinic,
          note,
        });
      }
    }
  };

  handleOnChangeInputText = (event, stateName) => {
    let stateCopy = { ...this.state };
    stateCopy[stateName] = event.target.value;
    this.setState({ ...stateCopy });
  };

  handleOnChangeInputTextWithName = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({ ...stateCopy });
  };

  handleOnSaveContentMarkdown = () => {
    console.log(`this.state`, this.state);
    let { hasOldData } = this.state;
    let action = hasOldData ? 'EDIT' : 'CREATE';
    this.props.saveDoctorInfo({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      // action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      action: action,

      selectedPrice: this.state.selectedPrice?.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic?.value
        ? this.state.selectedClinic.value
        : '',
      specialtyId: this.state.selectedSpecialty?.value
        ? this.state.selectedSpecialty.value
        : '',
    });
    this.setState({
      contentHTML: '',
      contentMarkdown: '',
      description: '',
      hasOldData: false,
    });
  };

  handleChangeSelectDoctorInfo = async (selectOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectOption;
    this.setState({ ...stateCopy });
    console.log(`stateCopy`, stateCopy);
  };

  render() {
    const {
      listSpecialty,
      contentMarkdown,
      hasOldData,
      addressClinic,
      nameClinic,
      note,
    } = this.state;
    // console.log(`this.state`, this.state);
    return (
      <>
        <div>
          <div className="manage-doctor-container container mb-4">
            <div className="manage-doctor-title text-center bold">
              <FormattedMessage id="admin.manage-doctor.title" />
            </div>
            <div className="more-info">
              <div className="content-left form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.select-doctor" />
                </label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChangeOption}
                  options={this.state.listDoctors}
                />
              </div>

              <div className="content-right form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.intro" />
                </label>
                <textarea
                  className="form-control"
                  rows="2"
                  onChange={(event) =>
                    this.handleOnChangeInputText(event, 'description')
                  }
                  value={this.state.description}>
                  This is text for test text area
                </textarea>
              </div>
            </div>
            <div className="row price-place pe-0">
              <div className="d-flex top-price">
                <div className="col-4 form-group">
                  <label>
                    <FormattedMessage id="admin.manage-doctor.price" />
                  </label>
                  <Select
                    value={this.state.selectedPrice}
                    onChange={this.handleChangeSelectDoctorInfo}
                    options={this.state.listPrice}
                    name="selectedPrice"
                    placeholder={
                      <FormattedMessage id="admin.manage-doctor.price" />
                    }
                  />
                </div>
                <div className="col-4 form-group">
                  <label>
                    <FormattedMessage id="admin.manage-doctor.payment" />
                  </label>
                  <Select
                    value={this.state.selectedPayment}
                    onChange={this.handleChangeSelectDoctorInfo}
                    options={this.state.listPayment}
                    name="selectedPayment"
                    placeholder={
                      <FormattedMessage id="admin.manage-doctor.payment" />
                    }
                  />
                </div>
                <div className="col-4 form-group">
                  <label>
                    <FormattedMessage id="admin.manage-doctor.province" />
                  </label>
                  <Select
                    value={this.state.selectedProvince}
                    onChange={this.handleChangeSelectDoctorInfo}
                    options={this.state.listProvince}
                    name="selectedProvince"
                    placeholder={
                      <FormattedMessage id="admin.manage-doctor.province" />
                    }
                  />
                </div>
              </div>
              <div className="row price-place container">
                <div className="row my-4 down-clinic">
                  <div className="col-4 ">
                    <label>
                      <FormattedMessage id="admin.manage-doctor.nameClinic" />
                    </label>
                    <input
                      value={nameClinic}
                      onChange={(event) =>
                        this.handleOnChangeInputText(event, 'nameClinic')
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-4 ">
                    <label>
                      <FormattedMessage id="admin.manage-doctor.addressClinic" />
                    </label>
                    <input
                      value={addressClinic}
                      onChange={(event) =>
                        this.handleOnChangeInputText(event, 'addressClinic')
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-4">
                    <label>
                      <FormattedMessage id="admin.manage-doctor.note" />
                    </label>
                    <input
                      value={note}
                      onChange={(event) =>
                        this.handleOnChangeInputText(event, 'note')
                      }
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row specialty container">
                <div className="row my-4 down-clinic">
                  <div className="col-4 ">
                    <label>
                      <FormattedMessage id="admin.manage-doctor.choose-specialty" />
                    </label>
                    <Select
                      value={this.state.selectedSpecialty}
                      onChange={this.handleOnChangeInputTextWithName}
                      options={this.state.listSpecialty}
                      placeholder={
                        <FormattedMessage id="admin.manage-doctor.choose-specialty" />
                      }
                      name="selectedSpecialty"
                    />
                  </div>
                  <div className="col-4 ">
                    <label>
                      <FormattedMessage id="admin.manage-doctor.addressClinic" />
                    </label>
                    {/* <input
                      value={addressClinic}
                      onChange={(event) =>
                        this.handleOnChangeInputText(event, 'addressClinic')
                      }
                      className="form-control"
                    /> */}
                    <Select
                      value={this.state.selectedClinic}
                      onChange={this.handleOnChangeInputTextWithName}
                      options={this.state.listClinic}
                      placeholder={
                        <FormattedMessage id="admin.manage-doctor.choose-clinic" />
                      }
                      name="selectedClinic"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="manage-doctor-editor">
              <MdEditor
                style={{ height: '250px' }}
                value={contentMarkdown}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleOnEditChange}
              />
            </div>
            <button
              onClick={() => this.handleOnSaveContentMarkdown()}
              className={
                hasOldData ? 'mt-4 btn btn-primary' : 'save-content-doctor'
              }>
              {hasOldData ? (
                <span>
                  <FormattedMessage id="admin.manage-doctor.save" />
                </span>
              ) : (
                <span>
                  <FormattedMessage id="admin.manage-doctor.add" />
                </span>
              )}
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfo: () =>
      dispatch(actions.getAllRequiredDoctorInfo()),
    saveDoctorInfo: (data) => dispatch(actions.saveDoctorInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
