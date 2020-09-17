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
import { getImageUrl } from '../../shared/helpers';
import moment from 'moment'

function RoomDetails(props) {
  let roomId = props.match.params.rooomId;
  // const userData = props.user.user;
  const [roomData, setRoomDate] = useState(null);


  useEffect(() => {
    props.crudActionCall(`${ROOM_URL}/${roomId}`, null, "GET")
    setRoomDate(props.room.action.data);

    return () => {

    }
  }, []);


  return (
    <div classNam="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i classNameName="fa fa-edit"></i>Room views
                </CardHeader>
            <CardBody>

              {props.room.action.data && (
                <ul className="list-unstyled todo-list">
                  <li>
                    <p>
                      <span className="title">No Of Room</span>
                      <span className="short-description">{props.room.action.data.roomNo}</span>
                    </p>
                  </li>

                  <li>
                    <p>
                    <span className="title">No Of Bath</span>
                      <span className="short-description">{props.room.action.data.bathNo}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                    <span className="title">Address</span>
                      <span className="short-description">{props.room.action.data.address}</span>
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
  const { room } = state;
  return {
    room
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOOM"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetails);