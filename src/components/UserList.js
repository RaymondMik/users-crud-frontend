import React from 'react';
import { Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    componentDidMount() {
        if (!this.props.userData.token) this.props.history.push('/');
        this.props.getUsers(this.props.userData.token);
    }
    
    render() {
        return (
            <div className="container">
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem onClick={() => this.props.history.push('/')}>Home</BreadcrumbItem>
                        <BreadcrumbItem active>User List </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

UserList.propTypes = {
    userData: PropTypes.object,
    history: PropTypes.any,
    getUsers: PropTypes.func
};

export default UserList;