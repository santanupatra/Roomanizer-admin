import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { LANDLORD_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
function LandlordList(props) {

    const getLandlordList = () => {
        props.crudActionCall(LANDLORD_URL + '?keyword&page=0', null, "GET_ALL")
    }

    useEffect(() => {
        getLandlordList();
        return () => {
            // cleanup
        }
    }, []);

    useEffect(() => {
        const { type, isSuccess } = props.landlord.action;
        if (type === "DELETE" && isSuccess)
            getLandlordList();
    }, [props.landlord]);

    const navToEditPage = (landlordId) => {
        props.history.push(`/landlord/edit/${landlordId}`);
    }

    const navToViewPage = (landlordId) => {
        props.history.push(`/landlord/details/${landlordId}`);
    }

    const deleteLandlord = (landlordId) => {
        props.crudActionCall(`${LANDLORD_URL}/${landlordId}`, null, "DELETE");
        // props.crudActionCall(userId, "DELETE");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Landlord List
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
                                    {props.landlord && props.landlord.landlordList.count > 0 ?
                                        props.landlord.landlordList.list.map((val) => {
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
                                                        <Button size="sm" className="btn-youtube btn-brand mr-1 mb-1" data-toggle="tooltip" title="Delete" onClick={() => { if (window.confirm('Are you sure you want to delete this landlord?')) { deleteLandlord(val._id) } }}>
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
    const { landlord } = state;
    return {
        landlord
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "LANDLORD"))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandlordList));