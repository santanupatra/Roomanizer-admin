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
import { ANIMITIES_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as Action from './Action';
import { bindActionCreators } from 'redux';

function AnimitiesForm(props) {

  const initialFields = {
    name: "",
    //cmsContent: "",
  }

  const [fields, setFields] = useState(initialFields);
  const [animitiesId, setHouseId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setHouseId(params.animitiesId)
    if (params.animitiesId) props.crudActionCall(`${ANIMITIES_URL}/${params.animitiesId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.animities.action;
    if (props. animities. animities && params.animitiesId) {
      setFields({ ...fields, ...props.animities.animities });
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/animities/list")

  }, [props.animities]);

  //const pagecontentHandler = (e) => {
    //setCityContent(e.editor.getData())
  //}

  const onSubmit = (data) => {
    if (animitiesId) data.animitiesId = animitiesId;
    //data.cityContent = cityContent;
    if (animitiesId) {
      props.crudActionCall(ANIMITIES_URL + `/${animitiesId}`, data, animitiesId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(ANIMITIES_URL, data,animitiesId ? "UPDATE" : "ADD");
    }
    props.resetAction();
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{animitiesId ? ` Animities Update` : ` Animities Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                {/* Page Title */}
                <InputUI
                  label="Animities Name"
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
  const { animities } = state;
  return {
    animities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ANIMITIES")),
    resetAction: () => dispatch({ type: "RESET_ANIMITIES_ACTION" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnimitiesForm));