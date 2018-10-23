import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Form, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { RenderInput } from '../utilities/formRenderer';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';
import { editUserPageForm, cancelEditUserPageForm, deselectUser } from '../actions/formActions';

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

class UserPage extends React.Component {
    componentWillUnmount() {
        this.props.deselectUser();
    }
    render() {
        const {edit, handleSubmit, pristine, reset, submitting} = this.props;
        const {userData} = this.props.location.state;

        const test = (value) => {console.log(999999, value);};

        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><NavLink to={{pathname: '/'}}>Home</NavLink></BreadcrumbItem>
                    <BreadcrumbItem><NavLink to={{pathname: '/user-list'}}>User List</NavLink></BreadcrumbItem>
                    <BreadcrumbItem active>User Page</BreadcrumbItem>
                </Breadcrumb>
                <h2>Manage user: {userData.userName}</h2>
                <Form className="user-page-form" onSubmit={handleSubmit(test)}>
                    <Field 
                        name='userName'
                        type='text' label='User Name'
                        placeholder={userData.userName}
                        props={{disabled: !edit}}
                        component={RenderInput}
                    />
                    <Field 
                        name='email'
                        type='email'
                        label='Email'
                        placeholder={userData.email}
                        props={{disabled: !edit}}
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
                    <Button color="info" onClick={() => this.props.editUserPageForm()}>Edit</Button> :
                    <Button color="secondary" onClick={() => this.props.cancelEditUserPageForm()}>Cancel</Button>
                }
            </div>
        );
    }
}

UserPage.propTypes = {
    userData: PropTypes.object,
    edit: PropTypes.boolean,
    editUserPageForm: PropTypes.func,
    cancelEditUserPageForm: PropTypes.func,
    deselectUser: PropTypes.func,
    form: PropTypes.string,
    handleSubmit: PropTypes.any, 
    pristine: PropTypes.any,
    reset: PropTypes.any,
    submitting: PropTypes.any,
    match: PropTypes.any,
    location: PropTypes.any
};

// connect to Redux store 
export default connect(
    // props
    (state, otherProps) => {
        const {usersList: {list}, userData} = state;
        const {location: {state: {userData: currentUser}}} = otherProps;
        const initialValues = (currentUser._id !== userData._id) ? list.find((user) => currentUser._id === user._id) : userData;
        return {
            ...otherProps,
            // userData is passed via React Router
            // set initial values for form inputs
            initialValues,
            edit: state.form.userPage.edit
        };
    },
    // actions
    {
        editUserPageForm: editUserPageForm,
        cancelEditUserPageForm: cancelEditUserPageForm,
        deselectUser: deselectUser
    }
    // connect to Redux Form
    )(reduxForm({
        form: 'userPage',
        destroyOnUnmount: false,
        validate
        // warn
})(UserPage));