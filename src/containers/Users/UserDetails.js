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
import { USER_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import moment from 'moment'

function UserDetails(props) {
  let userId = props.match.params.userId;
  // const userData = props.user.user;
  const [userData, setUserDate] = useState(null);


  useEffect(() => {
    props.crudActionCall(`${USER_URL}/${userId}`, null, "GET")
    setUserDate(props.user.action.data);

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

              {props.user.action.data && (
                <ul className="list-unstyled todo-list">
                  <li>
                    <p>
                      {/* <span className="title">Profile Picture</span> */}
                      <div className="text-center" style={{ height: 150 }}>
                      <img src={getImageUrl(props.user.action.data.profilePicture)} className="rounded-circle" style={{ height: "100%" }} alt="..." />
                      {/* <img src={'assets/img/dummy-profile-img.png'} class="rounded-circle" width="200" /> */}
                      </div>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Name</span>
                      <span className="short-description">{`${props.user.action.data.firstName}` + ` ${props.user.action.data.lastName}`}</span>
                    </p>
                  </li>

                  <li>
                    <p>
                      <span className="title">Email Address</span>
                      <span className="short-description">{props.user.action.data.email}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Date Of Birth</span>
                      <span className="short-description">{(props.user.action.data.dateOfBirth) ? moment(props.user.action.data.dateOfBirth).format('YYYY-MM-DD') : ''}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Address</span>
                      <span className="short-description">{props.user.action.data.address}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">City</span>
                      <span className="short-description">{props.user.action.data.city}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Zip Code</span>
                      <span className="short-description">{props.user.action.data.zipCode}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Status</span>
                      <span className="short-description">{props.user.action.data.isActive ? "Active" : "Inactive"}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);