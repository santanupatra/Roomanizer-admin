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
import { CITY_URL } from '../../shared/allApiUrl';
//import moment from 'moment';
//import CKEditor from 'ckeditor4-react'

function CityDetails(props) {
  let cityId = props.match.params.cityId;
  // const userData = props.user.user;
  const [cmsData, setCmsDate] = useState(null);

  useEffect(() => {

    props.crudActionCall(`${CITY_URL}/${cityId}`, null, "GET")
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
              <i classNameName="fa fa-edit"></i>City Name
                </CardHeader>
            <CardBody>
              {(cityId && props.city.city) && (
                <div
                  contenteditable
                  dangerouslySetInnerHTML={{
                    __html: props.city.city.cityName
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
  const { city } = state;
  console.log('cmsDetails', city)
  return {
    city
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityDetails);