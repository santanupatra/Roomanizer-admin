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
import { CMS_URL } from '../../shared/allApiUrl';
import moment from 'moment';
import CKEditor from 'ckeditor4-react'

function CMSDetails(props) {
  let cmsId = props.match.params.cmsId;
  // const userData = props.user.user;
  const [cmsData, setCmsDate] = useState(null);

  useEffect(() => {

    props.crudActionCall(`${CMS_URL}/${cmsId}`, null, "GET")
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
              <i classNameName="fa fa-edit"></i>CMS Content
                </CardHeader>
            <CardBody>
              {(cmsId && props.cms.cms) && (
                <div
                  contenteditable
                  dangerouslySetInnerHTML={{
                    __html: props.cms.cms.cmsContent
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
  const { cms } = state;
  console.log('cmsDetails', cms)
  return {
    cms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CMS"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CMSDetails);