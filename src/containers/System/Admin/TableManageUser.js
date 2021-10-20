import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../../store/actions';

import './TableManageUser.scss';

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
    console.log(`this.props.listUsers`, this.props.listUsers);
    console.log(`this.props.fetchUsersRedux`, this.props.fetchUsersRedux);
    console.log(`this.state.usersRedux`, this.state.usersRedux);

    const { usersRedux } = this.state;
    return (
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
