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
import FileInput from "../../UI/FileInput";
import { SETTINGS_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLogoUrl } from '../../shared/helpers';


function SettingForm(props) {

  const initialFields = {
    siteEmail: '',
    siteAddress: '',
    sitePhoneNumber: '',
    instagramUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    pinterestUrl: '',
    distanceRatio: null,
    paymentEnvironment: '',
    siteLogo: null
  }

  const [fields, setFields] = useState(initialFields);
  const [settingId, setSettingId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  const [payment, setPayment] = useState('');

  useEffect(() => {
    // setEmailId(params.emailId)
    // if (params.emailId) 
    props.crudActionCall(`${SETTINGS_URL}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.setting.action;

    if (props.setting.setting) {
      setFields({ ...fields, ...props.setting.setting });
      setSettingId(props.setting.setting._id);
      setPayment(props.setting.setting.paymentEnvironment)
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/setting")

  }, [props.setting]);

  const onSubmit = (data) => {

    if (settingId) data.settingId = settingId;
    //console.log('data......', data, settingId)
    data.siteLogo = data.siteLogo[0];
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    props.crudActionCall(SETTINGS_URL, formData, settingId ? "UPDATE" : "ADD");
    props.resetAction();
  }
  const radioHandler = (e) => {
    console.log('e', e.target.value)
    setPayment(e.target.value)
  }
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{"Settings"}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>

                {/* Site Email */}
                < InputUI
                  label="Site Email"
                  name="siteEmail"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* {'Address'} */}
                <InputUI
                  label="Address"
                  name="siteAddress"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Mobile Number */}
                <InputUI
                  label="Mobile Number"
                  name="sitePhoneNumber"
                  errors={errors}
                  innerRef={register({
                    required: false,
                  })}
                  fields={fields}
                  type="number"
                />

                {/* Instagram Url */}
                <InputUI
                  label="Instagram Url"
                  name="instagramUrl"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Facebook Url */}
                <InputUI
                  label="Facebook Url"
                  name="facebookUrl"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Twitter Url */}
                <InputUI
                  label="Twitter Url"
                  name="twitterUrl"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* LinkedIn Url */}
                <InputUI
                  label="LinkedIn Url"
                  name="pinterestUrl"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Youtube Url */}
                <InputUI
                  label="Youtube Url"
                  name="youtubeUrl"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Distance Ratio (Meters) */}
                <InputUI
                  label="Distance Ratio (Meters)"
                  name="distanceRatio"
                  errors={errors}
                  innerRef={register({
                    required: false,
                  })}
                  fields={fields}
                />
                <div className="text-center" style={{ height: 150 }}>
                  <img src={getLogoUrl(fields.siteLogo)} className="rounded-circle" style={{ height: "100%" }} alt="..." />
                  {/* <img src={'assets/img/dummy-profile-img.png'} class="rounded-circle" width="200" /> */}
                </div>
                <FileInput
                  label="Website Logo"
                  name="siteLogo"
                  register={register}
                  errors={errors}
                  required={false}
                />
                <label>Payment Environment</label><br />
                <input type="radio" id="Sandbox" name="payment" value="sandbox"
                  checked={payment === "sandbox"}
                  onChange={radioHandler} />&nbsp;&nbsp;
                <label >Sandbox</label><br />
                <input type="radio" id="Production" name="payment"
                  checked={payment === "production"}
                  value="production" onChange={radioHandler} />&nbsp;&nbsp;
                <label >Production</label>

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
  const { setting } = state;
  return {
    setting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "SETTING")),
    resetAction: () => dispatch({ type: "RESET_SETTING_ACTION" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SettingForm));