import React, { } from 'react';
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
import { callApi } from "../../api";
import { CHANGE_PASSWORD_URL } from '../../shared/allApiUrl';
import { getAuthUserId } from '../../shared/helpers';

function ChangePassword() {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (data) => {
        //data.adminId = getAuthUserId;

        callApi(CHANGE_PASSWORD_URL + `/${getAuthUserId}`, "PUT", data)
    }
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            <i className="fa fa-edit"></i>Change Password
                        </CardHeader>
                        <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                            <CardBody>
                                {/* Old Password */}
                                <InputUI
                                    label="Current Password"
                                    name="currentPassword"
                                    type="password"
                                    errors={errors}
                                    innerRef={register({
                                        required: 'This is required field',
                                    })}
                                    errors={errors}
                                />
                                {/* New Password*/}
                                <InputUI
                                    label="New Password"
                                    name="newPassword"
                                    type="password"
                                    errors={errors}
                                    innerRef={register({
                                        required: 'This is required field',
                                    })}
                                    errors={errors}
                                />
                                {/* Confirm Password */}
                                <InputUI
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    errors={errors}
                                    innerRef={register({
                                        required: 'This is required field',
                                    })}
                                    errors={errors}
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

export default ChangePassword;