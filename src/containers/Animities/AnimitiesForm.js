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
import FileInput from "../../UI/FileInput";
import { withRouter } from 'react-router-dom';
// import * as Action from './Action';
import { bindActionCreators } from 'redux';
import { getImageUrl } from '../../shared/helpers';


function AminitiesForm(props) {

  const initialFields = {
    name: "",
    aminitiesImage:"",
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
   console.log(props.aminities.aminities)
  useEffect(() => {
    const action = props.aminities.action;
    if (props. aminities. aminities && params.aminitiesId) {
      setFields({ ...fields, ...props.aminities.aminities });
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/")

  }, [props.aminities]);

  //const pagecontentHandler = (e) => {
    //setCityContent(e.editor.getData())
  //}

  const onSubmit = (data) => {
    data.aminitiesImage = data.aminitiesImage[0];
   if (aminitiesId) data.aminitiesId = aminitiesId;
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    console.log(aminitiesId)
    if (aminitiesId) {
      console.log(aminitiesId)
      props.crudActionCall(AMINITIES_URL + `/${aminitiesId}`, formData, aminitiesId ? "UPDATE" : "ADD");
    }
    else {
      console.log(aminitiesId)
      props.crudActionCall(AMINITIES_URL, formData ,aminitiesId ? "UPDATE" : "ADD");
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
                {aminitiesId ? (
                  <div className="text-center" style={{ height: 150 }}>
                  <img src={getImageUrl(fields.aminitiesImage)} className="rounded-circle" style={{ height: "100%" }} alt="..." />
                  {/* <img src={'assets/img/dummy-profile-img.png'} class="rounded-circle" width="200" /> */}
                </div>
                ) : (
                  ""
                )}
                <FileInput
                  label="Aminities Picture"
                  name="aminitiesImage"
                  register={register}
                  errors={errors}
                  required={false}
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