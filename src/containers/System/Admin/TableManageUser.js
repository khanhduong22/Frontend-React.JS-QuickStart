import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function handleOnChange({ html, text }) {
  console.log(`html,text`, html, text);
}

class TableManageUser extends Component {
  state = {
    usersRedux: [],
  };

  componentDidMount() {
    this.props.fetchUsersRedux();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({ usersRedux: this.props.listUsers });
    }
  }

  handleOnDeleteIcon = (id) => {
    this.props.deleteUsersRedux(id);
  };

  handleOnEditIcon = (user) => {
    this.props.handleEditUser(user);
  };

  render() {
    const { usersRedux } = this.state;
    return (
      <>
        <div>
          <div className="mt-4 mb-4">
            <table className="table table-hover">
              <thead className="table-info">
                <tr>
                  <th>
                    <FormattedMessage id="manage-user.email" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.first-name" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.last-name" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.address" />
                  </th>
                  <th className="text-center">
                    <FormattedMessage id="manage-user.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersRedux &&
                  usersRedux.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td className="action-row">
                          <div className="action-edit mx-2">
                            <button
                              className="btn btn-outline-warning "
                              onClick={() => this.handleOnEditIcon(item)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          </div>
                          <div className="action-delete mx-2">
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => this.handleOnDeleteIcon(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleOnChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUsersRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
