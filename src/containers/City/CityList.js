import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { CITY_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

function CityList(props) {

    const getCityList = () => {
        props.crudActionCall(CITY_URL, null, "GET_ALL")
    }

     useEffect(() => {
         getCityList();
         return () => {
             // cleanup
         }
     }, []);

    useEffect(() => {
        const { type, isSuccess } = props.city.action;
        if (type === "DELETE" && isSuccess)
            getCityList();
    }, [props.city]);

    const navToEditPage = (cityId) => {
        props.history.push(`/city/edit/${cityId}`);
    }

    const deleteUser = (cityId) => {
        props.crudActionCall(`${CITY_URL}/${cityId}`, null, "DELETE");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> City List
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th style={{width: "348px"}} className="text-center">City Name</th>
                                        <th style={{width: "348px"}}  className="text-center">Status</th>
                                        <th style={{width: "348px"}}  className="text-center">Action</th>                                   
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.city ?
                                        props.city.cityList.map((val) => {

                                            return (
                                                <tr>
                                                    <td  className="text-center">{val.cityName}</td>
                                                    <td  className="text-center">
                                                        {val.isActive ? <Badge color="success">Active</Badge> : <Badge color="danger">Deactive</Badge>}
                                                    </td>
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
    const { city } = state;
    return {
        city
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CityList));