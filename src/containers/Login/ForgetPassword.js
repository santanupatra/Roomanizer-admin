import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
  } from "reactstrap";
// import InputUI from '../../UI/InputUI';
import {callApi} from "../../api";
import { FORGET_PASSWORD_URL } from '../../shared/allApiUrl';
import { SET_PASSWORD_URL } from '../../shared/allApiUrl';
import { NotificationManager} from 'react-notifications';
// import { checkPropTypes } from 'prop-types';
// import { getAuthUserId } from '../../shared/helpers';

function ForgetPassword(props) {
    const { handleSubmit, register } = useForm();
    const [status, setStatus] = useState(false);

    const onSubmit = async(data) => {
        if (status === false) {
        try {
        await callApi(FORGET_PASSWORD_URL,"POST",data);
        setStatus(true);
        NotificationManager.success('Email Verified', 'Success');
        }
        catch (error) {
            NotificationManager.error('Email is not valid!', 'Error');
        }
    }
    else {
        try {
            await callApi(SET_PASSWORD_URL, "POST",data);
            NotificationManager.success('Password changed succesfully!', 'Success');
            props.history.push("/login");

        }
        catch (error) {
            console.log("Error");
            NotificationManager.error('OTP  is not valid!', 'Error');
        }
    }
    }
    return (
        <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <h1>Forget Password</h1>
                      <p className="text-muted">Please put your Email</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="email"
                          placeholder="Email"
                          disabled={status}
                          autoComplete="username"
                          innerRef={register}
                          required
                        />
                      </InputGroup>
                      { status? <> <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="otp"
                        placeholder="O.T.P"
                        autoComplete="current-password"
                        innerRef={register}
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      placeholder="New Password"
                    //   autoComplete="current-password"
                      innerRef={register}
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    // autoComplete="current-password"
                    innerRef={register}
                    required
                  />
                </InputGroup> </>: null}
                      {/* <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          innerRef={register}
                          required
                        />
                      </InputGroup> */}
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default ForgetPassword;