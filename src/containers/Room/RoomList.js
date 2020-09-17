import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { ROOM_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
function RoomList(props) {

    const getRoomList = () => {
        props.crudActionCall(ROOM_URL + '?keyword&page=0', null, "GET_ALL")
    }

    useEffect(() => {
        getRoomList();
        return () => {
            // cleanup
        }
    }, []);

    useEffect(() => {
        const { type, isSuccess } = props.room.action;
        if (type === "DELETE" && isSuccess)
            getRoomList();
    }, [props.room]);

    const navToEditPage = (roomId) => {
        props.history.push(`/room/edit/${roomId}`);
    }

    const navToViewPage = (roomId) => {
        props.history.push(`/room/details/${roomId}`);
    }
    const deleteRoom = (roomId) => {
        props.crudActionCall(`${ROOM_URL}/${roomId}`, null, "DELETE");
        // props.crudActionCall(userId, "DELETE");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Room List
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>No Of Room</th>
                                        <th>No Of Bath</th>
                                        {/* <th>Address</th> */}
                                        <th>isKitchen</th>
                                        <th>isBalkani</th>
                                        <th>isFurniture</th>
                                        <th>city</th>
                                        <th>isActive</th>
                                        
                                        {/* <th className="text-center">Status</th> */}
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.room ?
                                        props.room.roomList.map((val) => {

                                            return (
                                                <tr>
                                                    <td  className="text-center">{val.roomNo}</td>
                                                    <td  className="text-center">{val.bathNo}</td>
                                                    {/* <td  className="text-center">{val.addre}</td> */}
                                                    <td  className="text-center">
                                                        {val.isKitchen ? <Badge color="success">Active</Badge> : <Badge color="danger">Deactive</Badge>}
                                                    </td>
                                                    <td  className="text-center">
                                                        {val.isBalkani ? <Badge color="success">Active</Badge> : <Badge color="danger">Deactive</Badge>}
                                                    </td>
                                                    <td  className="text-center">
                                                        {val.isFurniture ? <Badge color="success">Active</Badge> : <Badge color="danger">Deactive</Badge>}
                                                    </td>
                                                    <td  className="text-center">{val.city}</td>
                                                    <td  className="text-center">
                                                        {val.isActive ? <Badge color="success">Active</Badge> : <Badge color="danger">Deactive</Badge>}
                                                    </td>
                                                    <td  className="text-center">
                                                    <Button size="sm" className="btn-xing btn-brand mr-1 mb-1" data-toggle="tooltip" title="View" onClick={() => navToViewPage(val._id)}>
                                                            <i className="fa fa-eye"></i>
                                                        </Button>
                                                        <Button size="sm" className="btn-twitter btn-brand mr-1 mb-1" data-toggle="tooltip" title="Edit" onClick={() => navToEditPage(val._id)}>
                                                            <i className="fa fa-pencil-square-o"></i>
                                                        </Button>
                                                       <Button size="sm" className="btn-youtube btn-brand mr-1 mb-1" data-toggle="tooltip" title="Delete" onClick={() => { if (window.confirm('Are you sure you want to delete this city?')) { deleteRoom(val._id) } }}>
                                                            <i className="fa fa-trash-o"></i>
                                                         </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })

                                        : null}
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
    const { room } = state;
    return {
        room
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM"))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomList));