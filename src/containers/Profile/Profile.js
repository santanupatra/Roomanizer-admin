import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";
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
import { PROFILE_URL } from "../../shared/allApiUrl";
import { getAuthUserId, getImageUrl, getAuthToken } from '../../shared/helpers';

function Profile(props) {
  const initialFields = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: null
  }

  const [fields, setFields] = useState(initialFields);
  const { handleSubmit, register, errors } = useForm();

  useEffect(() => {
    console.log('profile', getAuthUserId, PROFILE_URL, getAuthToken);
    props.crudActionCall(`${PROFILE_URL}/${getAuthUserId}`, null, "GET")
    return () => {
      // cleanup
    }
  }, []);

  useEffect(() => {
    if (props.profile.profile) {
      setFields({ ...fields, ...props.profile.profile })
    }

  }, [props.profile]);

  const onSubmit = (data) => {
    // console.log('data', data.profilePicture[0].name)
    data.profilePicture = data.profilePicture[0];
    data.adminId = getAuthUserId;
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    props.crudActionCall(PROFILE_URL + `/${getAuthUserId}`, formData, "UPDATE")
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>Edit Profile
                </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                <div className="text-center" style={{ height: 150 }}>
                  <img src={getImageUrl(fields.profilePicture)} className="rounded-circle" style={{ height: "100%" }} alt="..." />
                  {/* <img src={'assets/img/dummy-profile-img.png'} class="rounded-circle" width="200" /> */}
                </div>
                {/* First Name */}
                <InputUI
                  label="First Name"
                  name="firstName"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Last Name */}
                <InputUI
                  label="Last Name"
                  name="lastName"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                {/* Email-ID */}
                <InputUI
                  label="Email"
                  name="email"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                  readonly="readonly"
                />
                {/* Phone */}
                <InputUI
                  label="Phone"
                  name="phoneNumber"
                  type="number"
                  errors={errors}
                  innerRef={register}
                  fields={fields}
                />
                <FileInput
                  label="Profile Picture"
                  name="profilePicture"
                  register={register}
                  errors={errors}
                  required={false}
                />

              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                {/* <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button> */}
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = state => {
  const { profile } = state;
  return {
    profile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "PROFILE"))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);