import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import CheckboxUI from "../../UI/CheckboxInputUI";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  Row,
} from 'reactstrap';
import InputUI from '../../UI/InputUI';
import { CITY_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as Action from './Action';
import { bindActionCreators } from 'redux';
import CKEditor from 'ckeditor4-react';

function CityForm(props) {

  const initialFields = {
    cityName: "",
    //cmsContent: "",
  }

  const [fields, setFields] = useState(initialFields);
  const [cityId, setCityId] = useState(null);
  const [cmsContent, setCityContent] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setCityId(params.cityId)
    if (params.cityId) props.crudActionCall(`${CITY_URL}/${params.cityId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.city.action;
    if (props.city.city && params.cityId) {
      setFields({ ...fields, ...props.city.city });
      //setCityContent(props.city.city.cmsContent)
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/city/list")

  }, [props.city]);

  //const pagecontentHandler = (e) => {
    //setCityContent(e.editor.getData())
  //}

  const onSubmit = (data) => {
    if (cityId) data.cityId = cityId;
    //data.cityContent = cityContent;
    if (cityId) {
      props.crudActionCall(CITY_URL + `/${cityId}`, data, cityId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(CITY_URL, data, cityId ? "UPDATE" : "ADD");
    }
    props.resetAction();
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{cityId ? `City Update` : `City Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                {/* Page Title */}
                <InputUI
                  label="City Name"
                  name="cityName"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  errors={errors}
                  fields={fields}
                />
                {cityId ? (
                  <CheckboxUI
                    type="checkbox"
                    label="Status"
                    name="isActive"
                    errors={errors}
                    innerRef={register({})}
                    fields={fields}
                  />
                ) : (
                  ""
                )}
                
                
                
                
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = state => {
  const { city } = state;
  return {
    city
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY")),
    resetAction: () => dispatch({ type: "RESET_CITY_ACTION" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CityForm));