import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Form, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { RenderInput } from '../utilities/formRenderer';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';
import { editUserPageForm, cancelEditUserPageForm, selectUserForForm, deselectUserForForm } from '../actions/formActions';
import { updateUser } from '../actions/updateUserActions';

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
        this.props.deselectUserForForm();
        this.props.cancelEditUserPageForm();
    }

    handleCancelBtn() {
        this.props.cancelEditUserPageForm();
        this.props.reset();
    }

    render() {
        console.log(this.props);
        const {edit, handleSubmit, pristine, reset, submitting} = this.props;
        const {isFromList} = this.props.location.state;
        const {userData: {token}, usersList: {list}} = this.props;

        let userData = null;
        if (isFromList && list.length) {
            const {match: {params: {id}}} = this.props;
            userData = list.find(user => user._id === id);
        }

        if (!isFromList) {
            userData = this.props.userData;
        }
        
        const updateUser = (inputObject) => { 
            this.props.selectUserForForm(userData);
            this.props.updateUser({newData: inputObject, token, _id: userData._id}); 
        };

        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><NavLink to={{pathname: '/'}}>Home</NavLink></BreadcrumbItem>
                    <BreadcrumbItem><NavLink to={{pathname: '/user-list'}}>User List</NavLink></BreadcrumbItem>
                    <BreadcrumbItem active>User Page</BreadcrumbItem>
                </Breadcrumb>
                <h3 className="user-page__title">{userData.userName}</h3>
                <Form className="user-page__form" onSubmit={handleSubmit(updateUser)}>
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
                        <div className="user-page__form__buttons">
                            <Button type="submit" disabled={submitting} color="primary" >Save</Button>{' '}
                            <Button color="danger">Delete</Button>{' '}
                        </div>
                    }
                </Form>
                {!edit ? 
                    <Button color="info" onClick={() => this.props.editUserPageForm()}>Edit</Button> :
                    <Button color="secondary" onClick={this.handleCancelBtn.bind(this)}>Cancel</Button>
                }
            </div>
        );     
    }
}

UserPage.propTypes = {
    userData: PropTypes.object,
    usersList: PropTypes.object,
    edit: PropTypes.boolean,
    editUserPageForm: PropTypes.func,
    cancelEditUserPageForm: PropTypes.func,
    selectUserForForm: PropTypes.func,
    deselectUserForForm: PropTypes.func,
    updateUser: PropTypes.func,
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
        const {match: {params: {id: urlId}}} = otherProps;
        const user = (urlId !== userData._id) ? list.find((user) => urlId === user._id) : userData;
      
        return {
            ...otherProps,
            // userData is passed via React Router
            // set initial values for form inputs
            initialValues: {
               userName: user.userName,
               email: user.email
            },
            userData: state.userData,
            usersList: state.usersList,
            edit: state.form.userPage.edit
        };
    },
    // actions
    {
        editUserPageForm,
        cancelEditUserPageForm,
        selectUserForForm,
        deselectUserForForm,
        updateUser
    }
    // connect to Redux Form
    )(reduxForm({
        form: 'userPage',
        destroyOnUnmount: false,
        validate
        // warn
})(UserPage));