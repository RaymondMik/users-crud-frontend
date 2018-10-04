import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class UserForm extends React.Component {
  render() {
    return (
      <div className="container">
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default UserForm;