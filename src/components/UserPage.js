import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
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

const createRenderer = (render) => ({input, type, label, meta, ...otherProps}) => (
    <FormGroup row className={[
        meta.error && meta.touched ? 'error' : '',
        meta.active ? 'active' : ''
    ].join(' ')}>
        {/*<div>{JSON.stringify(meta, 0, 2)}</div>*/}
        <Label for={label} sm={2}>{label}</Label>
        <Col sm={10}>
            {render(input, type, label, otherProps)}
            {meta.touched && !meta.active && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
        </Col>
    </FormGroup>
);

const RenderInput = createRenderer((input, type, label) => <Input id={label} type={type} {...input} />);
const RenderSelect = createRenderer((input, type = 'select', label, {children}) => {
    return (    
        <Input id={label} type={type} name="select" {...input}>
            {children}
        </Input>
    );
});

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
    const options = [1,2,3,4,5,6];
    return (
        <div className="container">
            <h2>User Page</h2>
            <Form className="user-app-form" onSubmit={handleSubmit(marietto)}>
                {/*<FormGroup row>
                    <Label for="userNameInput" sm={2}>User Name</Label>
                    <Col sm={10}>
                        <Field 
                            name="userName" 
                            component={renderInput}
                        />
                    </Col>
                </FormGroup>*/}
                <Field name='userName' type='type' label='User Name' component={RenderInput}/>
                <Field name='email' type='email' label='Email' component={RenderInput}/>
                <Field name='options' type='select' label='Options' component={RenderSelect}>
                    {options.map(item => <option key={item} value={item}>{item}</option>)}
                </Field>
                
                <Button type="submit" disabled={submitting} color="primary" >Submit</Button>
                <Button color="danger">Delete</Button>
                {/* if status is edit */}<Button color="secondary">Change password</Button>
            </Form>
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