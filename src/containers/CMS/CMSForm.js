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
import { CMS_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as Action from './Action';
import { bindActionCreators } from 'redux';
import CKEditor from 'ckeditor4-react';

function CMSForm(props) {

  const initialFields = {
    cmsTitle: "",
    cmsContent: "",
  }

  const [fields, setFields] = useState(initialFields);
  const [cmsId, setCmsId] = useState(null);
  const [cmsContent, setCmsContent] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setCmsId(params.cmsId)
    if (params.cmsId) props.crudActionCall(`${CMS_URL}/${params.cmsId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.cms.action;
    if (props.cms.cms && params.cmsId) {
      setFields({ ...fields, ...props.cms.cms });
      setCmsContent(props.cms.cms.cmsContent)
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/cms/list")

  }, [props.cms]);

  const pagecontentHandler = (e) => {
    setCmsContent(e.editor.getData())
  }

  const onSubmit = (data) => {
    if (cmsId) data.cmsId = cmsId;
    data.cmsContent = cmsContent;
    if (cmsId) {
      props.crudActionCall(CMS_URL + `/${cmsId}`, data, cmsId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(CMS_URL, data, cmsId ? "UPDATE" : "ADD");
    }
    props.resetAction();
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{cmsId ? `CMS Update` : `CMS Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                {/* Page Title */}
                <InputUI
                  label="Page Title"
                  name="cmsTitle"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  errors={errors}
                  fields={fields}
                />
              
                {/* Page Content */}

                <label>Page Content</label>
                {cmsId ?
                  <CKEditor data={cmsContent} onChange={pagecontentHandler} />
                  : null}
                {!cmsId ?
                  <CKEditor data={cmsContent} onChange={pagecontentHandler} />
                  : null}
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
  const { cms } = state;
  return {
    cms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CMS")),
    resetAction: () => dispatch({ type: "RESET_CMS_ACTION" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CMSForm));