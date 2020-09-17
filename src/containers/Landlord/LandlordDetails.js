import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import '../../custom.css';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
import { LANDLORD_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import moment from 'moment'

function LandlordDetails(props) {
  let landlordId = props.match.params.landlordId;
  // const userData = props.user.user;
  const [landlordData, setLandlordDate] = useState(null);


  useEffect(() => {
    props.crudActionCall(`${LANDLORD_URL}/${landlordId}`, null, "GET")
    setLandlordDate(props.landlord.action.data);

    return () => {

    }
  }, []);


  return (
    <div classNam="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i classNameName="fa fa-edit"></i>View Profile
                </CardHeader>
            <CardBody>

              {props.landlord.action.data && (
                <ul className="list-unstyled todo-list">
                  <li>
                    <p>
                      {/* <span className="title">Profile Picture</span> */}
                      <div className="text-center" style={{ height: 150 }}>
                      <img src={getImageUrl(props.landlord.action.data.profilePicture)} className="rounded-circle" style={{ height: "100%" }} alt="..." />
                      {/* <img src={'assets/img/dummy-profile-img.png'} class="rounded-circle" width="200" /> */}
                      </div>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Name</span>
                      <span className="short-description">{`${props.landlord.action.data.firstName}` + ` ${props.landlord.action.data.lastName}`}</span>
                    </p>
                  </li>

                  <li>
                    <p>
                      <span className="title">Email Address</span>
                      <span className="short-description">{props.landlord.action.data.email}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Date Of Birth</span>
                      <span className="short-description">{(props.landlord.action.data.dateOfBirth) ? moment(props.landlord.action.data.dateOfBirth).format('YYYY-MM-DD') : ''}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Address</span>
                      <span className="short-description">{props.landlord.action.data.address}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">City</span>
                      <span className="short-description">{props.landlord.action.data.city}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Zip Code</span>
                      <span className="short-description">{props.landlord.action.data.zipCode}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Status</span>
                      <span className="short-description">{props.landlord.action.data.isActive ? "Active" : "Inactive"}</span>
                    </p>
                  </li>
                  
                </ul>
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(LandlordDetails);