import React, { useEffect,useState } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card,  CardFooter,CardBody, Input, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { CONTACT_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
const initialState = {
    searchParam: "",
  };
function ContactList(props) {
    const [contact, setContact] = useState({ ...initialState });
    const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
     const [searchMode, setSearchMode] = useState(false);
    const getCityList = () => {
        console.log(props)
        props.crudActionCall(CONTACT_URL, null, "GET_ALL")
    }
    const handleSearch = (name, value) => {
        setContact((prevState) => ({ ...prevState, [name]: value }));
      };
      const handleFilter = (e) => {
        setSearchMode(true);
        props.crudActionCall(
          `${CONTACT_URL}?keyword=${props.contact.searchParam}&page=0`,
          null,
          "GET_ALL"
        );
      };
    useEffect(() => {
        getCityList();
        return () => {
            // cleanup
        }
    }, []);
    useEffect(() => {
        let y = props.contact.contactList.limit;
        let x = parseInt(props.contact.contactList.count / y);
        if (props.contact.contactList.count > x * y) {
          setTotalPage(x + 1);
        } else {
          setTotalPage(x);
        }
      }, [props.contact.contactList.count]);
     
    //   const handleSearch = (name, value) => {
    //     setUser((prevState) => ({ ...prevState, [name]: value }));
    //   };
    //   const handleFilter = (e) => {
    //     setSearchMode(true);
    //     props.crudActionCall(
    //       `${CONTACT_URL}?keyword=${props.contact.searchParam}&page=0`,
    //       null,
    //       "GET_ALL"
    //     );
    //   };
    
      const handleClick = (e, index) => {
        e.preventDefault();
        if (searchMode) {
          setCurrentPage(index);
          props.crudActionCall(
            `${CONTACT_URL}?keyword=${contact.searchParam}&page=${index}`,
            null,
            "GET_ALL"
          );
        } else {
          if (currentPage === index) {
            return;
          } else {
            setCurrentPage(index);
            props.crudActionCall(
              `${CONTACT_URL}?keyword=&page=${index}`,
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
                                    <i className="fa fa-align-justify"></i> Contact List{""}
                                </Col>
                                <Col xs="4" className="text-right" style={{ textAlign: "end" }}>
                                    <Input
                                        type="text"
                                        name="searchParam"
                                        placeholder="Name or Email"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            handleSearch(e.target.name, e.target.value)
                                          }
                                    />
                                </Col>
                                {/* <Col xs="1" className="text-right"> */}
                                <Button color="primary" className="px-4" onClick={handleFilter}>
                                    Search
                </Button>
                                {/* </Col> */}
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>

                                        {/* <th>Address</th> */}
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Create Date</th>
                                        <th className="text-center">Send Reply</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.contact ?
                                        props.contact.contactList.map((val) => {

                                            return (
                                                <tr>
                                                    <td className="text-center">{val.name}</td>
                                                    <td className="text-center">{val.email}</td>
                                                    <td className="text-center">{val.subject}</td>
                                                    <td className="text-center">{val.message}</td>
                                                    <td className="text-center">{val.createdDate}</td>
                                                    <td className="text-center">

                                                        {/* <a  class="btn btn-primay" href={`mailto:${val.email}`}>EmailButton</a> */}
                                                        {/* <buttonr class="btn btn-primay"> */}
                                                        <a class="btn btn-primay" href={`mailto:${val.email}`}>Reply</a>
                                                        {/* </buttonr> */}
                                                        {/* <a href="#" id="mailbutton" onClick={this.onClick} class="btn btn-primary">Send us a mail!</a> */}
                                                    </td>
                                                </tr>
                                            );
                                        })

                                        : null}
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
    const { contact } = state;
    return {
        contact
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CONTACT"))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactList));