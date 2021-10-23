import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';

import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { LANGUAGES, USER_ROLE } from '../../utils';
// import actionTypes from '../../store/actions/actionTypes';

class Header extends Component {
  state = {
    menuApp: [],
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({ menuApp: menu });
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="language">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />
            {userInfo?.firstName ?? ''}
          </span>
          <div
            onClick={() => this.changeLanguage(LANGUAGES.VI)}
            className={
              language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'
            }
          >
            <span>VI</span>
          </div>
          <div
            onClick={() => this.changeLanguage(LANGUAGES.EN)}
            className={
              language === LANGUAGES.EN ? 'language-en active' : 'language-en'
            }
          >
            <span>EN</span>
          </div>
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
