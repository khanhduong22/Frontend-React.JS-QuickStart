import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';

import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {
  state = {};

  componentDidMount() {}

  changeLanguage = (language) => {
    // language
    this.props.changeLanguageFromBanner(language);
  };

  render() {
    let { language } = this.props;
    return (
      <>
        <div className="home-header">
          <div className="home-header__content">
            <div className="home-header__content-left">
              <i className="fa fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.props.history.push('/home')}
              ></div>
            </div>
            <div className="home-header__content-center">
              <div>
                <div>
                  <b>
                    <FormattedMessage id="home-header.specialty" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.search-doctor" />
                </div>
              </div>

              <div>
                <div>
                  <b>
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.select-room" />
                </div>
              </div>

              <div>
                <div>
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.select-doctor" />
                </div>
              </div>

              <div>
                <div>
                  <b>
                    <FormattedMessage id="home-header.fee" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.check-health" />
                </div>
              </div>
            </div>
            <div className="home-header__content-right">
              <div className="support">
                <i className="fa fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div
                onClick={() => this.changeLanguage(LANGUAGES.VI)}
                className={
                  language === LANGUAGES.VI
                    ? 'language-vi active'
                    : 'language-vi'
                }
              >
                <span>VI</span>
              </div>
              <div
                onClick={() => this.changeLanguage(LANGUAGES.EN)}
                className={
                  language === LANGUAGES.EN
                    ? 'language-en active'
                    : 'language-en'
                }
              >
                <span>EN</span>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------- banner */}
        {this.props.isBannerShow === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title1">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fa fa-search"></i>
                <input type="text" placeholder="Tìm chuyên khoa khám bệnh..." />
              </div>
            </div>
            <div className="content-down">
              <div className="option">
                <div className="option-child">
                  <div className="option-child-icon">
                    <i className="fa fa-hospital"></i>
                  </div>
                </div>
                <div className="option-child-text">
                  <FormattedMessage id="banner.child1" />
                </div>
              </div>
              <div className="option">
                <div className="option-child">
                  <div className="option-child-icon">
                    <i className="fa fa-mobile"></i>
                  </div>
                </div>
                <div className="option-child-text">
                  <FormattedMessage id="banner.child2" />
                </div>
              </div>
              <div className="option">
                <div className="option-child">
                  <div className="option-child-icon">
                    <i className="fa fa-procedures"></i>
                  </div>
                </div>
                <div className="option-child-text">
                  <FormattedMessage id="banner.child3" />
                </div>
              </div>
              <div className="option">
                <div className="option-child">
                  <div className="option-child-icon">
                    <i className="fa fa-flask"></i>
                  </div>
                </div>
                <div className="option-child-text">
                  <FormattedMessage id="banner.child4" />
                </div>
              </div>
              <div className="option">
                <div className="option-child">
                  <div className="option-child-icon">
                    <i className="fa fa-user-md"></i>
                  </div>
                </div>
                <div className="option-child-text">
                  <FormattedMessage id="banner.child5" />
                </div>
              </div>
              <div className="option">
                <div className="option-child">
                  <div className="option-child-icon">
                    <i className="fa fa-briefcase-medical"></i>
                  </div>
                </div>
                <div className="option-child-text">
                  <FormattedMessage id="banner.child6" />
                </div>
              </div>
            </div>
          </div>
        )}
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
  return {
    changeLanguageFromBanner: (language) =>
      dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
