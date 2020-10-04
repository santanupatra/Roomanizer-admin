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
import { AMINITIES_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as Action from './Action';
import { bindActionCreators } from 'redux';

function AminitiesForm(props) {

  const initialFields = {
    name: "",
    //cmsContent: "",
  }

  const [fields, setFields] = useState(initialFields);
  const [aminitiesId, setHouseId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setHouseId(params.aminitiesId)
    if (params.aminitiesId) props.crudActionCall(`${AMINITIES_URL}/${params.aminitiesId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.aminities.action;
    if (props. aminities. aminities && params.aminitiesId) {
      setFields({ ...fields, ...props.animities.animities });
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/aminities/list")

  }, [props.aminities]);

  //const pagecontentHandler = (e) => {
    //setCityContent(e.editor.getData())
  //}

  const onSubmit = (data) => {
    if (aminitiesId) data.aminitiesId = aminitiesId;
    //data.cityContent = cityContent;
    if (aminitiesId) {
      props.crudActionCall(AMINITIES_URL + `/${aminitiesId}`, data, aminitiesId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(AMINITIES_URL, data,aminitiesId ? "UPDATE" : "ADD");
    }
    props.resetAction();
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{aminitiesId ? ` Aminities Update` : ` Aminities Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                {/* Page Title */}
                <InputUI
                  label="Aminities Name"
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
  const { aminities } = state;
  return {
    aminities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "AMINITIES")),
    resetAction: () => dispatch({ type: "RESET_AMINITIES_ACTION" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AminitiesForm));