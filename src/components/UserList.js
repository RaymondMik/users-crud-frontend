import React from 'react';
import { Alert, Button, Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    componentDidMount() {
        if (!this.props.userData.token) this.props.history.push('/');
        this.props.getUsers(this.props.userData.token);
    }
    
    render() {
        const {role} = this.props.userData;

        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem onClick={() => this.props.history.push('/')}>Home</BreadcrumbItem>
                    <BreadcrumbItem active>User List </BreadcrumbItem>
                </Breadcrumb>
                {role === 'admin' ?
                    <Table striped>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>EMAIL</th>
                                <th>USER NAME</th>
                                <th>ROLE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.usersList.list.map((user) => {
                                return (
                                    <tr key={`user-${user._id}`}>
                                        <td>{user._id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Button 
                                                outline color="primary" 
                                                size="sm"
                                                onClick={() => this.props.history.push(`/user-page/${user._id}`)}>Edit
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table> 
                : 
                    <Alert color="danger">
                        You are not allowed to perform this operation!
                    </Alert>
                }
            </div>
        );
    }
}

UserList.propTypes = {
    userData: PropTypes.object,
    usersList: PropTypes.object,
    history: PropTypes.any,
    getUsers: PropTypes.func
};

export default UserList;