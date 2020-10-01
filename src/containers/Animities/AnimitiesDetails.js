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
import { ANIMITIES_URL } from '../../shared/allApiUrl';
//import moment from 'moment';
//import CKEditor from 'ckeditor4-react'

function AnimitiesDetails(props) {
  let animitiesId = props.match.params.animitiesId;
  // const userData = props.user.user;

  useEffect(() => {

    props.crudActionCall(`${ANIMITIES_URL}/${animitiesId}`, null, "GET")
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
              <i classNameName="fa fa-edit"></i>Animities Name
                </CardHeader>
            <CardBody>
              {(animitiesId && props.animities.animities) && (
                <div
                  contenteditable
                  dangerouslySetInnerHTML={{
                    __html: props.animities.animities.name
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
  const { animities } = state;
  console.log('House', animities)
  return {
    animities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ANIMITIES"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimitiesDetails);