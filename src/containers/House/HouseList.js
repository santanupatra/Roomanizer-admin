import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { HOUSE_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

function HouseList(props) {

    const getCityList = () => {
        props.crudActionCall(HOUSE_URL, null, "GET_ALL")
    }

     useEffect(() => {
         getCityList();
         return () => {
             // cleanup
         }
     }, []);

    useEffect(() => {
        const { type, isSuccess } = props.house.action;
        if (type === "DELETE" && isSuccess)
            getCityList();
    }, [props.house]);

    const navToEditPage = (houseId) => {
        props.history.push(`/house/edit/${houseId}`);
    }

    const deleteUser = (houseId) => {
        props.crudActionCall(`${HOUSE_URL}/${houseId}`, null, "DELETE");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> House List
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th style={{width: "348px"}} className="text-center">House Name</th>
                                        <th style={{width: "348px"}}  className="text-center">Action</th>                                   
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.house ?
                                        props.house.houseList.map((val) => {

                                            return (
                                                <tr>
                                                    <td  className="text-center">{val.name}</td>
                                                    <td  className="text-center">
                                                        <Button size="sm" className="btn-twitter btn-brand mr-1 mb-1" data-toggle="tooltip" title="Edit" onClick={() => navToEditPage(val._id)}>
                                                            <i className="fa fa-pencil-square-o"></i>
                                                        </Button>
                                                        <Button size="sm" className="btn-youtube btn-brand mr-1 mb-1" data-toggle="tooltip" title="Delete" onClick={() => { if (window.confirm('Are you sure you want to delete this city?')) { deleteUser(val._id) } }}>
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
    const { house } = state;
    return {
        house
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "HOUSE"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HouseList));