import React from 'react';
import { Button, Form } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { RenderInput } from '../utilities/formRenderer';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

const validate = values => {  
    const errors = {};
    if (!values.userName) {
        errors.userName = 'Required';
    } else if (values.userName.length < 5) {
        errors.userName = 'Must be 5 characters or more';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!isEmail(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};
  
// const warn = values => {
//     const warnings = {};
//     if (values.userName && values.userName.length > 15) {
//         warnings.age = 'Must be 15 characters or less';
//     }
//     return warnings;
// };

let UserPage = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;

    const urlId = props.match.params.id;
    const {usersList: {list}, userData, userData: {role}} = props;
    let currentUser = null;
    if (list.length && role === 'admin') {
        currentUser = list.find(({_id}) => _id === urlId);
    } else {
        currentUser = userData;
    }

    const marietto = (value) => {console.log(999999, value);};

    return (
        <div className="narrow-container">
            <h2>Manage user: {currentUser.userName}</h2>
            <Form className="user-app-form" onSubmit={handleSubmit(marietto)}>
                <Field name='userName' type='type' label='User Name' placeholder={currentUser.userName} component={RenderInput}/>
                <Field name='email' type='email' label='Email' placeholder={currentUser.email} component={RenderInput}/>
                <Button type="submit" disabled={submitting} color="primary" >Submit</Button>{' '}
                <Button color="danger">Delete</Button>{' '}
                <Button color="secondary">Cancel</Button>
            </Form>
            <Button color="info">Edit</Button>
        </div>
    );
};

UserPage.propTypes = {
    userData: PropTypes.object,
    usersList: PropTypes.object,
    match: PropTypes.any,
    handleSubmit: PropTypes.any,
    pristine: PropTypes.any,
    reset: PropTypes.any,
    submitting: PropTypes.any
};

UserPage = reduxForm({
    form: 'userPage',
    destroyOnUnmount: false,
    validate
    // warn
})(UserPage);

export default UserPage;