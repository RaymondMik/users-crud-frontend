import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class UserForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    if (this.props.userData.isSignedIn) this.props.history.push('/');
  }

  componentDidUpdate() {
    const {responseReceived, isSignedIn} = this.props.userData;
    if (responseReceived && isSignedIn) setTimeout(() => {
      this.props.history.push('/');
      this.props.resetSignUserState();
    }, 2000);
  }

  handleFormOnChange(e) {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.props.signUserIn({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    const {responseReceived, isSignedIn} = this.props.userData;
    const displayAlertClass = !responseReceived ? 'hide' : '';
    const alertColor = isSignedIn ? 'success' : 'danger';
    const alertMessage = isSignedIn ? 'You successfully logged in! Redirecting to home...' : 'There was an error!';

    return (
      <div className="container">
        <Form className="user-app-form" onSubmit={this.handleFormSubmit.bind(this)}>
          <FormGroup>
            <Label for="emailInput">Email</Label>
            <Input type="email" name="email" id="emailInput" value={this.state.email} onChange={this.handleFormOnChange.bind(this)}/>
          </FormGroup>
          <FormGroup>
            <Label for="passwordInput">Password</Label>
            <Input type="password" name="password" id="passwordInput" value={this.state.password} onChange={this.handleFormOnChange.bind(this)}/>
          </FormGroup>
          <Button>Submit</Button>
          <Alert className={`sign-in-alert ${displayAlertClass}`} color={alertColor}>
            {alertMessage}
          </Alert>
        </Form>
      </div>
    );
  }
}

UserForm.propTypes = {
  userData: PropTypes.object,
  history: PropTypes.any,
  signUserIn: PropTypes.func,
  resetSignUserState: PropTypes.func
};

export default UserForm;