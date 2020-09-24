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
  // FormGroup,
  // Label,
  // Input
} from 'reactstrap';
import InputUI from '../../UI/InputUI';
// import CheckboxInputUI from '../../UI/CheckboxInputUI';
import { EMAIL_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CKEditor from 'ckeditor4-react';

function EmailForm(props) {

  const initialFields = {
    emailSubject: "",
    emailContent: "",
  }

  // const initialActiveFeilds = {
  //   active: false,
  // }

  const [fields, setFields] = useState(initialFields);
  // const [activefeilds, setActiveFeilds] = useState(initialActiveFeilds);
  const [emailId, setEmailId] = useState(null);
  // const [active, setActive] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setEmailId(params.emailId)
    if (params.emailId) props.crudActionCall(`${EMAIL_URL}/${params.emailId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.email.action;
    if (props.email.email && params.emailId) {
      setFields({ ...fields, ...props.email.email });
      setEmailContent(props.email.email.emailContent)
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/email/list")

  }, [props.email]);

  const onSubmit = (data) => {

    if (emailId) data.emailId = emailId;
    // data.active = active;
    data.emailContent = emailContent;
    if (emailId) {
      props.crudActionCall(EMAIL_URL + `/${emailId}`, data, emailId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(EMAIL_URL, data, emailId ? "UPDATE" : "ADD");
    }
    props.resetAction();
  }

  const emailContentHandler = (e) => {
    setEmailContent(e.editor.getData())
  }

  // const activeHandler = (e) => {
  //   setActive(!active);
  // }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{emailId ? `Email Update` : `Email Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                {/* Email Subject */}
                <InputUI
                  label="Email Subject"
                  name="emailSubject"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* <CheckboxInputUI
                  label="Email Status"
                  name="active"
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  errors={errors}
                  fields={activefeilds}
                /> */}
                <label>EmailTemplate Content</label>
                {emailId ?
                  <CKEditor data={emailContent} onChange={emailContentHandler} />
                  : null}
                {!emailId ?
                  <CKEditor data={emailContent} onChange={emailContentHandler} />
                  : null}

                {/* {emailId && (
                  <>
                    <CKEditor data={emailcontent} onChange={emailContentHandler} />
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" value={active} onClick={activeHandler} />{' '}
                    Status
                  </Label>
                    </FormGroup>
                  </>
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
  const { email } = state;
  return {
    email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "EMAIL")),
    resetAction: () => dispatch({ type: "RESET_EMAIL_ACTION" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmailForm));