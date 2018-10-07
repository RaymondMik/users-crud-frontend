import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    if (this.props.userData.isSignedIn) this.props.history.push('/');
  }

  componentDidUpdate() {
    const {responseReceived} = this.props.userData;
    if (responseReceived === 'success') setTimeout(() => {
      const redirectDestination = this.props.location.pathname === '/sign-up' ? '/sign-in' : '/';
      this.props.resetSignUserState();
      this.props.history.push(redirectDestination);
      this.setState({
        userName: '',
        email: '',
        password: ''
      });
    }, 2000);
  }

  handleFormOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const isSignUpForm = this.props.location.pathname === '/sign-up' ? true : false;

    if (isSignUpForm) {
      this.props.signUserUp({
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password
      });
    } else {
      this.props.signUserIn({
        email: this.state.email,
        password: this.state.password
      });
    }
  }

  render() {
    const {responseReceived, isSignedIn} = this.props.userData;
    const displayAlertClass = !responseReceived ? 'hide' : '';
    const alertColor = responseReceived === 'success' ? 'success' : 'danger';
    const successMessage = isSignedIn ? 'logged in! Redirecting to home...' : 'created a new user! Redirecting to sign in...';
    const alertMessage = responseReceived === 'failure' ? 'There was an error!' : `You successfully ${successMessage}`;
    const isSignUpForm = this.props.location.pathname === '/sign-up' ? true : false;

    return (
      <div className="container">
        <Form className="user-app-form" onSubmit={this.handleFormSubmit.bind(this)}> 
          {isSignUpForm ? <h3>Create a new user</h3> : <h3>Sign In using your profile</h3>}
          {isSignUpForm &&
            <FormGroup>
              <Label for="userNameInput">User Name</Label>
              <Input type="text" name="userName" id="userNameInput" value={this.state.userName} onChange={this.handleFormOnChange.bind(this)}/>
            </FormGroup>
          }
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
  userData: PropTypes.object.isRequired,
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  signUserIn: PropTypes.func,
  signUserUp: PropTypes.func,
  resetSignUserState: PropTypes.func.isRequired
};

export default UserForm;