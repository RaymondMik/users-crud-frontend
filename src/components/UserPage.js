import React from 'react';
import { connect } from 'react-redux';
import { editUserPageForm, cancelEditUserPageForm } from '../actions/userPageFormActions';
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
    const {usersList: {list}, userData, userData: {role}, match: {params: {id: urlId}}, edit, handleSubmit, pristine, reset, submitting} = props;
    let currentUser = null;
    if (list.length && role === 'admin') {
        currentUser = list.find(({_id}) => _id === urlId);
    } else {
        currentUser = userData;
    }

    const test = (value) => {console.log(999999, value);};

    return (
        <div className="narrow-container">
            <h2>Manage user: {currentUser.userName}</h2>
            <Form className="user-page-form" onSubmit={handleSubmit(test)}>
                <Field 
                    name='userName'
                    type='text' label='User Name'
                    placeholder={currentUser.userName}
                    props={{
                        disabled: !edit,
                        value: currentUser.userName
                    }}
                    component={RenderInput} 
                />
                <Field 
                    name='email'
                    type='email'
                    label='Email'
                    placeholder={currentUser.email} 
                    props={{
                        disabled: !edit,
                        value: currentUser.email
                    }}
                    component={RenderInput} 
                />
                {edit && 
                    <div className="user-page-form__buttons">
                        <Button type="submit" disabled={submitting} color="primary" >Save</Button>{' '}
                        <Button color="danger">Delete</Button>{' '}
                    </div>
                }
            </Form>
            {!edit ? 
                <Button color="info" onClick={() => props.editUserPageForm()}>Edit</Button> :
                <Button color="secondary" onClick={() => props.cancelEditUserPageForm()}>Cancel</Button>
            }
        </div>
    );
};

UserPage.propTypes = {
    userData: PropTypes.object,
    usersList: PropTypes.object,
    edit: PropTypes.boolean,
    editUserPageForm: PropTypes.func,
    cancelEditUserPageForm: PropTypes.func,
    form: PropTypes.string,
    handleSubmit: PropTypes.any, 
    pristine: PropTypes.any, 
    reset: PropTypes.any, 
    submitting: PropTypes.any, 
    match: PropTypes.any
};

UserPage = reduxForm({
    form: 'userPage',
    destroyOnUnmount: false,
    validate
    // warn
})(UserPage);

UserPage = connect(
    // props
    (state, otherProps) => ({
        ...otherProps,
        initialValues: state.usersList.list.length ? state.usersList.list[urlId] : state.userData,
        userData: state.userData,
        usersList: state.usersList,
        edit: state.form.userPage.edit
    }),
    // actions
    {
        editUserPageForm: editUserPageForm,
        cancelEditUserPageForm: cancelEditUserPageForm,
    }
  )(UserPage);

export default UserPage;