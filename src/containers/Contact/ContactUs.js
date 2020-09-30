import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { Badge, Card, CardBody, Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { CONTACT_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
function ContactList(props) {
//   const onClick=()=>{
//         window.location.href = `mailto:${props.contact.contactList[0].email}`;
//     }
    const getCityList = () => {
        console.log(props)
        props.crudActionCall(CONTACT_URL, null, "GET_ALL")
    }

     useEffect(() => {
         getCityList();
         return () => {
             // cleanup
         }
     }, []);
    return (
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Contact List
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        
                                        {/* <th>Address</th> */}
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>                    
                                        <th className="text-center">Send Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.contact ?
                                        props.contact.contactList.map((val) => {

                                            return (
                                                <tr>
                                                    <td  className="text-center">{val.name}</td>
                                                    <td  className="text-center">{val.email}</td>
                                                    <td  className="text-center">{val.subject}</td>
                                                    <td  className="text-center">
                                                        
                                                    {/* <a  class="btn btn-primay" href={`mailto:${val.email}`}>EmailButton</a> */}
                                                        <buttonr class="btn btn-primay">
                                                        <a  class="btn btn-primay" href={`mailto:${val.email}`}>EmailButton</a>
                                                        </buttonr>
                                                         {/* <a href="#" id="mailbutton" onClick={this.onClick} class="btn btn-primary">Send us a mail!</a> */}
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