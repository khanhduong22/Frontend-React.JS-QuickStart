import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { USER_ROLE } from '../utils';
import _ from 'lodash';

class Home extends Component {
  render() {
    const { isLoggedIn } = this.props;
    // const { isLoggedIn, userInfo } = this.props;
    // let adminPath = '/system/user-manage';
    // let doctorPath = 'doctor/manage-patient';
    // let role = userInfo?.roleId;
    let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';
    // if (userInfo && !_.isEmpty(userInfo)) {
    //   if (isLoggedIn && role === USER_ROLE.ADMIN) {
    //     linkToRedirect = adminPath;
    //   }
    //   if (isLoggedIn && role === USER_ROLE.DOCTOR) {
    //     linkToRedirect = doctorPath;
    //   }
    // }
    // console.log(`linkToRedirect`, linkToRedirect);
    // let linkToRedirect = isLoggedIn ? '/login' : '/home';

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
