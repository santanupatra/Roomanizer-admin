import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Input, Button, CardHeader, CardFooter, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { AMINITIES_URL } from '../../shared/allApiUrl';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
const initialState = {
    searchParam: "",
};

function AminitiesList(props) {
    const [aminities, setTrip] = useState({ ...initialState });
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchMode, setSearchMode] = useState(false);
    console.log("aminities==>", props.aminities.aminities)

    const getAminitiesList = () => {
        props.crudActionCall(AMINITIES_URL + '?keyword&page=0', null, "GET")
    }
    console.log(props.aminities.aminities)
    useEffect(() => {
        getAminitiesList();
        return () => {
            // cleanup
        }
    }, []);
    useEffect(() => {
        let y = props.aminities.aminitiesList.limit;
        let x = parseInt(props.aminities.aminitiesList.count / y);
        if (props.aminities.aminitiesList.count > x * y) {
            setTotalPage(x + 1);
            console.log(x + 1)
        } else {
            setTotalPage(x);
            console.log(x)
        }
    }, [props.aminities.aminitiesList.count]);
    const handleSearch = (name, value) => {
        setTrip((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleFilter = (e) => {
        setSearchMode(true);
        props.crudActionCall(
            `${AMINITIES_URL}?keyword=${aminities.searchParam}&page=0`,
            null,
            "GET_ALL"
        );
        console.log(props.aminities)
    };
    useEffect(() => {
        const { type, isSuccess } = props.aminities.action;
        if (type === "DELETE" && isSuccess)
        getAminitiesList();
    }, [props.aminities]);

    const navToEditPage = (aminitiesId) => {
        props.history.push(`/animities/edit/${aminitiesId}`);
    }

    const deleteUser = (aminitiesId) => {
        props.crudActionCall(`${AMINITIES_URL}/${aminitiesId}`, null, "DELETE");
    }

    const handleClick = (e, index) => {
        e.preventDefault();
        if (searchMode) {
            if (currentPage === index) {
                return;
            } else {
                setCurrentPage(index);
                props.crudActionCall(
                    `${AMINITIES_URL}?keyword=${aminities.searchParam}&page=${index}`,
                    null,
                    "GET_ALL"
                );
            }
        } else {
            if (currentPage === index) {
                return;
            } else {
                setCurrentPage(index);
                props.crudActionCall(
                    `${AMINITIES_URL}?keyword=&page=${index}`,
                    null,
                    "GET_ALL"
                );
            }
        }
    };

    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>

                            <Row>
                                <Col xs="6">
                                    <i className="fa fa-align-justify"></i> Animities List
                </Col>
                                <Col xs="4" className="text-right" style={{ textAlign: "end" }}>
                                    <Input
                                        type="text"
                                        name="searchParam"
                                        placeholder="Animities Name"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            handleSearch(e.target.name, e.target.value)
                                        }
                                    />
                                </Col>
                                {/* <Col xs="1" className="text-right"> */}
                                <Button color="primary" className="px-4"
                                    onClick={handleFilter}
                                >
                                    Search
                </Button>
                                {/* </Col> */}
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "348px" }} className="text-center">Aminities Name</th>
                                        <th style={{ width: "348px" }} className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.aminities.aminities ?
                                       props.aminities.aminities.list.map((val) => {

                                            return (
                                                <tr>
                                                    <td className="text-center">{val.name}</td>
                                                    <td className="text-center">
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

                                        : null
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <Pagination aria-label="Page navigation example">
                                <PaginationItem disabled={currentPage <= 0}>
                                    <PaginationLink
                                        onClick={(e) => handleClick(e, currentPage - 1)}
                                        previous
                                        href="#"
                                    />
                                </PaginationItem>

                                {totalPage
                                    ? [...Array(totalPage)].map((page, i) => (
                                        <PaginationItem active={i === currentPage} key={i}>
                                            <PaginationLink
                                                onClick={(e) => handleClick(e, i)}
                                                href="#"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))
                                    : null}

                                <PaginationItem disabled={currentPage >= totalPage - 1}>
                                    <PaginationLink
                                        onClick={(e) => handleClick(e, currentPage + 1)}
                                        next
                                        href="#"
                                    />
                                </PaginationItem>
                            </Pagination>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => {
    const { aminities } = state;
    return {
        aminities
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "AMINITIES"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AminitiesList));