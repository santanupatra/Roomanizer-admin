import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
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
import { HOUSE_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as Action from './Action';
import { bindActionCreators } from 'redux';

function HouseForm(props) {

  const initialFields = {
    name: "",
    //cmsContent: "",
  }

  const [fields, setFields] = useState(initialFields);
  const [houseId, setHouseId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setHouseId(params.houseId)
    if (params.houseId) props.crudActionCall(`${HOUSE_URL}/${params.houseId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.house.action;
    if (props.house.house && params.houseId) {
      setFields({ ...fields, ...props.house.house });
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/house/list")

  }, [props.house]);

  //const pagecontentHandler = (e) => {
    //setCityContent(e.editor.getData())
  //}

  const onSubmit = (data) => {
    if (houseId) data.houseId = houseId;
    //data.cityContent = cityContent;
    if (houseId) {
      props.crudActionCall(HOUSE_URL + `/${houseId}`, data, houseId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(HOUSE_URL, data, houseId ? "UPDATE" : "ADD");
    }
    props.resetAction();
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{houseId ? `House Update` : `House Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                {/* Page Title */}
                <InputUI
                  label="House Name"
                  name="name"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  errors={errors}
                  fields={fields}
                />
                {/* {cityId ? (
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
                )} */}
                
                
                
                
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
  const { house } = state;
  return {
    house
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "HOUSE")),
    resetAction: () => dispatch({ type: "RESET_CITY_ACTION" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HouseForm));