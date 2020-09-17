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
import { ROOM_URL } from '../../shared/allApiUrl';
import moment from 'moment';
import CKEditor from 'ckeditor4-react'

function BookingDetails(props) {
  let roomId = props.match.params.roomId;
  // const userData = props.user.user;
  const [cmsData, setCmsDate] = useState(null);

  useEffect(() => {

    props.crudActionCall(`${ROOM_URL}/${roomId}`, null, "GET")
    // let viewData = props.cms.cmsList.filter(f => f._id === parseInt(cmsId));
    // setCmsDate(viewData);

    return () => {

    }
  }, []);



  return (
    <div classNam="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i classNameName="fa fa-edit"></i>Booking Details
                </CardHeader>
            <CardBody>
              {(roomId && props.room.room) && (
                <ul className="list-unstyled todo-list">
                  <li>
                    <p>
                      <span className="title">No Of Room</span>
                      <span className="short-description">{`${props.room.room.roomNo}`}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">No Of Bath</span>
                      <span className="short-description">{`${props.room.room.bathNo}`}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">Address</span>
                      <span className="short-description">{`${props.room.room.address}`}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="title">City</span>
                      <span className="short-description">{`${props.room.room.city}`}</span>
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
  const { room } = state;
  //console.log('cmsDetails', province)
  return {
    room
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);