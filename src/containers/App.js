import { ConnectedRouter as Router } from 'connected-react-router';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import ConfirmModal from '../components/ConfirmModal';
import CustomScrollbars from '../../src/components/CustomScrollbars';
import Login from '../containers/Auth/Login';
import HomePage from '../containers/HomePage/HomePage';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from '../hoc/authentication';
import { history } from '../redux';
import Home from '../routes/Home';
// import Header from './Header/Header';
import System from '../routes/System';
import { path } from '../utils';

class App extends Component {
  handlePersistState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* <ConfirmModal /> */}

            <div className="content-container">
              <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                </Switch>
              </CustomScrollbars>
              <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
