import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { CMS_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

function CMSList(props) {

    const getUserList = () => {
        props.crudActionCall(CMS_URL, null, "GET_ALL")
    }

    useEffect(() => {
        getUserList();
        return () => {
            // cleanup
        }
    }, []);

    useEffect(() => {
        const { type, isSuccess } = props.cms.action;
        if (type === "DELETE" && isSuccess)
            getUserList();
    }, [props.cms]);

    const navToEditPage = (cmsId) => {
        props.history.push(`/cms/edit/${cmsId}`);
    }

    const navToViewPage = (cmsId) => {
        props.history.push(`/cms/details/${cmsId}`);
    }

    const deleteUser = (cmsId) => {
        props.crudActionCall(`${CMS_URL}/${cmsId}`, null, "DELETE");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> CMS List
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th style={{width: "348px"}} className="text-center">Page Title</th>
                                        <th style={{width: "348px"}} className="text-center">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {props.cms ?
                                        props.cms.cmsList.map((val) => {

                                            return (
                                                <tr>
                                                    <td className="text-center">{val.cmsTitle}</td>
                                                    <td className="text-center">
                                                        <Button size="sm" className="btn-xing btn-brand mr-1 mb-1" data-toggle="tooltip" title="View" onClick={() => navToViewPage(val._id)}>
                                                            <i className="fa fa-eye"></i>
                                                        </Button>
                                                        <Button size="sm" className="btn-twitter btn-brand mr-1 mb-1" data-toggle="tooltip" title="Edit" onClick={() => navToEditPage(val._id)}>
                                                            <i className="fa fa-pencil-square-o"></i>
                                                        </Button>
                                                        <Button size="sm" className="btn-youtube btn-brand mr-1 mb-1" data-toggle="tooltip" title="Delete" onClick={() => { if (window.confirm('Are you sure you want to delete this Cms?')) { deleteUser(val._id) } }}>
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
    const { cms } = state;
    return {
        cms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CMS"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CMSList));