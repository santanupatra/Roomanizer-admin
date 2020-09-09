import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { USER_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
function UserList(props) {

    const getUserList = () => {
        props.crudActionCall(USER_URL + '?keyword&page=0', null, "GET_ALL")
    }

    useEffect(() => {
        getUserList();
        return () => {
            // cleanup
        }
    }, []);

    useEffect(() => {
        const { type, isSuccess } = props.user.action;
        if (type === "DELETE" && isSuccess)
            getUserList();
    }, [props.user]);

    const navToEditPage = (userId) => {
        props.history.push(`/user/edit/${userId}`);
    }

    const navToViewPage = (userId) => {
        props.history.push(`/user/details/${userId}`);
    }

    const deleteUser = (userId) => {
        props.crudActionCall(`${USER_URL}/${userId}`, null, "DELETE");
        // props.crudActionCall(userId, "DELETE");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> User List
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.user && props.user.userList.count > 0 ?
                                        props.user.userList.list.map((val) => {
                                            if(val.userType==="customer"){
                                            return (
                                                <tr>
                                                   
                                                    <td>{val.firstName + ' ' + val.lastName}</td>
                                                    <td>{val.email}</td>
                                                    <td className="text-center">
                                                        {val.isActive ? <Badge color="success">Active</Badge> : <Badge color="danger">Deactive</Badge>}
                                                    </td>
                                                    <td className="text-center">
                                                        <Button size="sm" className="btn-xing btn-brand mr-1 mb-1" data-toggle="tooltip" title="View" onClick={() => navToViewPage(val._id)}>
                                                            <i className="fa fa-eye"></i>
                                                        </Button>
                                                        <Button size="sm" className="btn-twitter btn-brand mr-1 mb-1" data-toggle="tooltip" title="Edit" onClick={() => navToEditPage(val._id)}>
                                                            <i className="fa fa-pencil-square-o"></i>
                                                        </Button>
                                                        <Button size="sm" className="btn-youtube btn-brand mr-1 mb-1" data-toggle="tooltip" title="Delete" onClick={() => { if (window.confirm('Are you sure you want to delete this user?')) { deleteUser(val._id) } }}>
                                                            <i className="fa fa-trash-o"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );}
                                        })

                                        : null}
                                    {/* )
                                    })} */}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => {
    const { user } = state;
    return {
        user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER"))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList));