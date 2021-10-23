import MarkdownIt from 'markdown-it';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManagerDoctor.scss';
import Select from 'react-select';
import { getDetailDoctorInfo } from '../../../services/userService';

import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';

const mdParser = new MarkdownIt();

class ManagerDoctor extends Component {
  state = {
    contentHTML: '',
    contentMarkdown: '',
    description: '',
    selectedOption: {},
    listDoctors: [],
    hasOldData: false,
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
    this.setState({ listDoctors: this.props.allDoctors });
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
    });
    let res = await getDetailDoctorInfo(selectedOption.value);
    if (res?.data?.data?.Markdown) {
      let markdown = res.data.data.Markdown;
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
        });
      }
    }
  };

  handleOnChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  handleOnSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    let action = hasOldData ? 'EDIT' : 'CREATE';
    this.props.saveDoctorInfo({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      // action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      action: action,
    });
    this.setState({
      contentHTML: '',
      contentMarkdown: '',
      description: '',
      hasOldData: false,
    });
  };

  render() {
    const { contentMarkdown, hasOldData, contentHTML } = this.state;
    return (
      <>
        <div>
          <div className="manage-doctor-container container mb-4">
            <div className="manage-doctor-title text-center bold">
              Tạo thêm thông tin doctors{' '}
            </div>
            <div className="more-info">
              <div className="content-left form-group">
                <label>Chọn bác sĩ</label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChangeOption}
                  options={this.state.listDoctors}
                />
              </div>

              <div className="content-right form-group">
                <label>Thông tin giới thiệu</label>
                <textarea
                  className="form-control"
                  rows="4"
                  onChange={(event) => this.handleOnChangeDescription(event)}
                  value={this.state.description}
                >
                  This is text for test text area
                </textarea>
              </div>
            </div>
            <div className="manage-doctor-editor">
              <MdEditor
                style={{ height: '350px' }}
                value={contentMarkdown}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleOnEditChange}
              />
            </div>
            <button
              onClick={() => this.handleOnSaveContentMarkdown()}
              className={
                hasOldData ? 'mt-4 btn btn-primary' : 'save-content-doctor'
              }
            >
              {hasOldData ? (
                <span>Lưu thay đổi</span>
              ) : (
                <span>Tạo thông tin</span>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDoctorInfo: (data) => dispatch(actions.saveDoctorInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
