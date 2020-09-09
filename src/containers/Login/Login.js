import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from "react-redux";
import { login } from '../../store/actions/auth';
import { useForm } from "react-hook-form";
import { getAuthToken } from "../../shared/helpers";

function Login(props) {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (data) => {
    props.loginApiCall(data);

  }

  useEffect(() => {
    if (props.auth.isAuthenticated && getAuthToken !== "")
      props.history.push("/dashboard");
    return () => {
      // cleanup
    }
  }, [props.auth]);


  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
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
                        autoComplete="username"
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
                        placeholder="Password"
                        autoComplete="current-password"
                        innerRef={register}
                        required />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          type="submit"
                          color="primary"
                          className="px-4"

                        >
                          Login
                          </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
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

const mapStateToProps = state => {
  const { auth } = state;
  return {
    auth: auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginApiCall: (data) => dispatch(login(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
