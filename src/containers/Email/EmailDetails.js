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
import { EMAIL_URL } from '../../shared/allApiUrl';
import { getImageUrl } from '../../shared/helpers';
import moment from 'moment';
import logo from '../../assets/img/brand/logoemail.png';
import CKEditor from 'ckeditor4-react';


function EmailDetails(props) {
  let emailId = props.match.params.emailId;
  // const userData = props.user.user;
  const [emailData, setEmailDate] = useState(null);

  useEffect(() => {
    props.crudActionCall(`${EMAIL_URL}/${emailId}`, null, "GET")
    // let viewData = props.email.emailList.filter(f => f.id === parseInt(emailId));
    // setEmailDate(viewData);
    return () => {

    }
  }, []);



  return (
    <div classNam="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i classNameName="fa fa-edit"></i>Email Content
                </CardHeader>
            <CardBody>
              {(emailId && props.email.email) && (
                <div
                  contenteditable
                  dangerouslySetInnerHTML={{
                    __html: props.email.email.emailContent
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
  const { email } = state;
  return {
    email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "EMAIL"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailDetails);