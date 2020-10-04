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
import { AMINITIES_URL } from '../../shared/allApiUrl';
//import moment from 'moment';
//import CKEditor from 'ckeditor4-react'

function AnimitiesDetails(props) {
  const aminitiesId = props.match.params.aminitiesId;
  // const userData = props.user.user;

  useEffect(() => {

    props.crudActionCall(`${AMINITIES_URL}/${aminitiesId}`, null, "GET")
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
              {(aminitiesId && props.aminities.aminities) && (
                <div
                  contenteditable
                  dangerouslySetInnerHTML={{
                    __html: props.aminities.aminities.name
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
  const { aminities } = state;
  console.log('House', aminities)
  return {
    aminities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "AMINITIES"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimitiesDetails);