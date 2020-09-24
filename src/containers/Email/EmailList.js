import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { EMAIL_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

function EmailList(props) {

    const getUserList = () => {
        props.crudActionCall(EMAIL_URL + '?keyword&page=0', null, "GET_ALL")
    }

    useEffect(() => {
        getUserList();
        return () => {
            // cleanup
        }
    }, []);

    useEffect(() => {
        const { type, isSuccess } = props.email.action;
        if (type === "DELETE" && isSuccess)
            getUserList();
    }, [props.email]);

    const navToEditPage = (emailId) => {
        props.history.push(`/email/edit/${emailId}`);
    }

    const navToViewPage = (emailId) => {
        props.history.push(`/email/details/${emailId}`);
    }

    const deleteUser = (emailId) => {
        props.crudActionCall(`${EMAIL_URL}/${emailId}`, null, "DELETE");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Email List
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>Email Subject</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {props.email && props.email.emailList.count > 0 ?
                                        props.email.emailList.list.map((val) => {
                                            return (
                                                <tr>
                                                    <td>{val.emailSubject}</td>
                                                    <td>
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
                                            );
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
    const { email } = state;
    return {
        email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "EMAIL"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmailList));