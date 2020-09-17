import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import CheckboxUI from "../../UI/CheckboxInputUI";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  Input,
  Row,
} from 'reactstrap';
import InputUI from '../../UI/InputUI';
import { CITY_URL } from '../../shared/allApiUrl';
import { ROOM_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function RoomForm(props) {

  const initialFields = {
    roomNo: "",
    bathNo: "",
    address: "",
    city:"",
    isKitchen:"",
    isBalkani:"",
    isFurniture:"",
    isActive:""
    // dateOfBirth: null
  }

  const [fields, setFields] = useState(initialFields);
  const [roomId, setRoomId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setRoomId(params.roomId)
    if (params.roomId) props.crudActionCall(`${ROOM_URL}/${params.roomId}`, null, "GET")
    props.crudActionCityCall(CITY_URL, null, "GET_ALL")
  }, [params]);

  useEffect(() => {
    const { type, isSuccess } = props.city.action;
    if (props.room.room && params.roomId) {
      setFields({ ...fields, ...props.room.room })
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/room/list")

  }, [props.room,props.city]);

  const onSubmit = (data) => {
    if (rooomId) data.roomId = roomId;
    if (roomId) {
      props.crudActionCall(ROOOM_URL + `/${roomId}`, data, roomId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(ROOM_URL, data, roomId ? "UPDATE" : "ADD");
    }
    props.resetAction();
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{roomId ? `Room Update` : `Room Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
            <label>Address</label>
              <InputUI
                  name="address"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                <label>Room No</label>
              <InputUI
                  name="roomNo"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                <label>Room No</label>
              <InputUI
                  name="bathNo"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
                <label>City Name </label>
                <Input
                    type="select"
                    name="city"
                    id="city"
                    innerRef={register}
                    value={fields.city}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  >
                    <option>City Name</option> 
                    
                   {
                     props.city && props.city.cityList.map((val) =>{
                    // languageList && languageList.map((value ,key)=>{
                       //console.log('languageListvalue',value);
                        return(
                          //<option value={value._id} key={key}>{value.cityName}</option>
                          
                        <option>{val.cityName}</option>
                        );
                     })
                    } 
                    {roomId ? (
                  <CheckboxUI
                    type="checkbox"
                    label="Status"
                    name="isKitchen"
                    errors={errors}
                    innerRef={register({})}
                    fields={fields}
                  />
                ) : (
                  ""
                )}
                  </Input>
                  {roomId ? (
                  <CheckboxUI
                    type="checkbox"
                    label="Status"
                    name="isBalkani"
                    errors={errors}
                    innerRef={register({})}
                    fields={fields}
                  />
                ) : (
                  ""
                )}
                {roomId ? (
                  <CheckboxUI
                    type="checkbox"
                    label="Status"
                    name="isFurniture"
                    errors={errors}
                    innerRef={register({})}
                    fields={fields}
                  />
                ) : (
                  ""
                )}
                {roomId ? (
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
                )}
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
  const { room,city } = state;
  return {
      room,
    city
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "ROOM")),
    resetAction: () => dispatch({ type: "RESET_ROOM_ACTION" }),
    crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomForm));