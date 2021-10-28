import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  state = {
    name: '',
    imageBase64: '',
    descriptionHTML: '',
    descriptionMarkdown: '',
    previewImgURL: '',
  };

  componentDidMount() {}

  handleOnEditChange = ({ text, html }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({ previewImgURL: objectUrl, imageBase64: base64 });
    }
  };

  handleOnChangeInput = (event, state) => {
    let stateCopy = { ...this.state };
    stateCopy[state] = event.target.value;
    this.setState({ ...stateCopy });
  };

  handleOnClickSaveButton = async () => {
    console.log(`this.state`, this.state);
    let res = await createNewSpecialty(this.state);
    if (res) {
      console.log(`res`, res);
    }
  };

  render() {
    const { descriptionMarkdown } = this.state;
    return (
      <>
        <div className="container">
          <div className="specialty-title text-center fw-bold fs-3 text-capitalize">
            This is for ManageSpecialty
          </div>
          <div className="row">
            <div className="col-6 form-group my-2">
              <label>Ten chuyen khoa</label>
              <input
                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                className="form-control"
                type="text"
              />
            </div>
            <div className="col-6 form-group my-2">
              <label>Anh chuyen khoa</label>
              <input
                onChange={(event) => this.handleOnChangeImage(event)}
                className="form-control"
                type="file"
              />
            </div>
          </div>
          <MdEditor
            style={{ height: '400px' }}
            value={descriptionMarkdown}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleOnEditChange}
          />
          <button
            onClick={() => this.handleOnClickSaveButton()}
            className="btn btn-warning mt-4">
            Save
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
