import React, { useEffect ,useState} from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button,Input, CardHeader,CardFooter, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { USER_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
const initialState = {
    searchParam: "",
};
function UserList(props) {
    const [user, setUser] = useState({ ...initialState });
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchMode, setSearchMode] = useState(false);
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
    useEffect(() => {
        let y = props.user.userList.limit;
        let x = parseInt(props.user.userList.count / y);
        if (props.user.userList.count > x * y) {
            setTotalPage(x + 1);
            console.log(x + 1)
        } else {
            setTotalPage(x);
            console.log(x)
        }
    }, [props.user.userList.count]);
    const handleSearch = (name, value) => {
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleFilter = (e) => {
        setSearchMode(true);
        props.crudActionCall(
            `${USER_URL}?keyword=${user.searchParam}&page=0`,
            null,
            "GET_ALL"
        );
        console.log(props.user)
    };
    const handleClick = (e, index) => {
        e.preventDefault();
        if (searchMode) {
            if (currentPage === index) {
                return;
            } else {
                setCurrentPage(index);
                props.crudActionCall(
                    `${USER_URL}?keyword=${user.searchParam}&page=${index}`,
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
                    `${USER_URL}?keyword=&page=${index}`,
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
                                    <i className="fa fa-align-justify"></i> User  List
                </Col>
                                <Col xs="4" className="text-right" style={{ textAlign: "end" }}>
                                    <Input
                                        type="text"
                                        name="searchParam"
                                        placeholder="User Name"
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
                                        
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.user && props.user.userList.count > 0 ?
                                        props.user.userList.list.map((val) => {
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
                                            );
                                        })

                                        : null}
                                    {/* )
                                    })} */}
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