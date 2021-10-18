import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from '../../services/userService';

import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.setState({
  //     arrUser: [],
  //   });
  // }
  state = {
    arrUser: [],
    isOpenModalUser: false,
    isOpenModalEditUser: false,
    userEdit: {},
  };

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  toggle = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleForEdit = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  getAllUsersFromReact = async () => {
    let response = await getAllUsers('ALL');
    if (response?.data.errorCode === 0) {
      this.setState({
        arrUser: response?.data?.users ?? [],
      });
    }
  };

  handleOnClickAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };

  createNewUser = async (userData) => {
    try {
      let response = await createNewUserService(userData);
      if (response?.data?.errorCode !== 0) {
        console.log(response);
        alert(response.data.errorMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res?.data?.errorCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });

        await this.getAllUsersFromReact();
      } else {
        alert(res.data.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleOnEditIcon = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  handleOnDeleteIcon = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res?.data.errorCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.data.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUser = this.state.arrUser || [];

    return (
      <div className="text-center">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFunction={this.toggle}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFunctionForEdit={this.toggleForEdit}
            editUser={this.state.userEdit}
            updateUser={this.updateUser}
          />
        )}
        <h1>Manage users from Re act</h1>
        <button
          className="btn btn-primary px-4"
          onClick={() => {
            this.handleOnClickAddNewUser();
          }}
        >
          <i className="fa fa-plus" />
          Add new User
        </button>

        <div className="mt-4 mx-4">
          <table className="table table-hover">
            <thead className="table-info">
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUser &&
                arrUser.map((item, idex) => {
                  return (
                    <>
                      <tr>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <span className="mx-4">
                            <button
                              className="btn btn-outline-warning px-4"
                              onClick={() => this.handleOnEditIcon(item)}
                            >
                              <i class="fas fa-edit"></i>
                            </button>
                          </span>
                          <button
                            className="btn btn-outline-danger px-4"
                            onClick={() => this.handleOnDeleteIcon(item)}
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
