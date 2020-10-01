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
import { HOUSE_URL } from '../../shared/allApiUrl';
//import moment from 'moment';
//import CKEditor from 'ckeditor4-react'

function HouseDetails(props) {
  let houseId = props.match.params.houseId;
  // const userData = props.user.user;

  useEffect(() => {

    props.crudActionCall(`${HOUSE_URL}/${houseId}`, null, "GET")
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
              <i classNameName="fa fa-edit"></i>House Name
                </CardHeader>
            <CardBody>
              {(houseId && props.house.house) && (
                <div
                  contenteditable
                  dangerouslySetInnerHTML={{
                    __html: props.house.house.name
                  }}
                >
                </div>
              )}

            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = state => {
  const { house } = state;
  console.log('House', house)
  return {
    house
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "HOUSE"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseDetails);