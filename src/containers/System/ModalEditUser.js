import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { emitter } from '../../utils/emitter';

import _ from 'lodash';

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    };
  }

  componentDidMount() {
    let user = this.props.editUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'notShow',
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFunctionForEdit();
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

  handleOnClickSaveButton = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.updateUser(this.state);
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
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    disabled
                    value={this.state.email}
                    // id="exampleEmail"
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
                    disabled
                    value={this.state.password}
                    // id="examplePassword"
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
                    value={this.state.firstName}
                    // id="exampleEmail"
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
                    value={this.state.lastName}
                    // id="examplePassword"
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
                value={this.state.address}
                // id="exampleAddress"
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
            onClick={() => this.handleOnClickSaveButton()}
          >
            Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
