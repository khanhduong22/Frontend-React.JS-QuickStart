import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    };
    this.listerToEmitter();
  }

  listerToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
      };
    });
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFunction();
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for (let index = 0; index < arrInput.length; index++) {
      if (!this.state[arrInput[index]]) {
        isValid = false;
        alert('Missing parameter: ' + arrInput[index]);
        break;
      }
      return isValid;
    }
  };

  handleOnClickSignUpButton = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.createNewUser(this.state);
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
      });
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={'abcClassname'}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password placeholder"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="exampleEmail"
                    placeholder="First Name"
                    onChange={(e) =>
                      this.setState({ firstName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="examplePassword"
                    placeholder="Last Name"
                    onChange={(e) =>
                      this.setState({ lastName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleAddress">Address</Label>
              <Input
                type="text"
                name="address"
                id="exampleAddress"
                placeholder="1234 Main St"
                onChange={(e) => this.setState({ address: e.target.value })}
              />
            </FormGroup>
            <Row>
              <Col md={6}></Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => this.handleOnClickSignUpButton()}
          >
            Sign Up
          </Button>{' '}
          <Button color="secondary" onClick={() => this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
