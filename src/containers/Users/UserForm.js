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
  FormGroup,
  Row,
} from 'reactstrap';
import InputUI from '../../UI/InputUI';
import FileInput from "../../UI/FileInput";
import { getImageUrl } from '../../shared/helpers';
import { USER_URL } from '../../shared/allApiUrl';
import { CITY_URL } from '../../shared/allApiUrl';
import { crudAction } from '../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
//import 'react-google-places-autocomplete/dist/index.min.css';
import Geocode from "react-geocode";
const palceKey = "AIzaSyA5LrPhIokuSBO5EgKEcfu859gog6fRF8w";
  Geocode.setApiKey(palceKey);
  Geocode.setLanguage("en");

function UserForm(props) {

  const initialFields = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: null,
    profilePicture: null,
    city: "",
    address: "",
    street: "",
    zipCode: null,
    password: null,
    dateOfBirth: null,
    longitude:"",
    latitude:"",
  }
  
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setUserId(params.userId)
    if (params.userId) props.crudActionCall(`${USER_URL}/${params.userId}`, null, "GET")
    props.crudActionCityCall(CITY_URL, null, "GET_ALL")
  }, [params]);

  useEffect(() => {
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/user/list")

  }, [props.user]);

  const onSubmit = (data) => {
    data.longitude = fields.longitude;
    data.latitude = fields.latitude;
    data.address = fields.address;
    data.profilePicture = data.profilePicture[0];
    if (userId) data.userId = userId;
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    if (userId) {
      props.crudActionCall(USER_URL + `/${userId}`, formData, userId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(USER_URL, formData, userId ? "UPDATE" : "ADD");
    }
    props.resetAction();
  }

  const searchOptions = {
    componentRestrictions: { country: ['us','ca','uy'] },
    //types: ['city']
  }
  
  const handleChange = address => {
    setFields((prevState) => ({ ...prevState, address }));
  };
  const  handlechange = (name,value)=>{
    setFields((prevState) => ({ ...prevState, [name]: value }));
  }
  
  const handleSelect = address => {
    //setFields((prevState) => ({ ...prevState, ["street"]: address.structured_formatting.main_text }));
    setFields((prevState) => ({ ...prevState, ["street"]: address })); 
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
    //  .then(latLng => console.log('Success', latLng))
    //  .catch(error => console.error('Error', error));

      .then(({ lat, lng }) => {
              console.log("lat==",lat,"lng==",lng)
              console.log(address);
            //  console.log(address.structured_formatting.main_text);
            //  console.log(address.structured_formatting.secondary_text);
              // Geocode.fromLatLng(lat, lng).then(
              //   response => {
              //     const zipCode = response.results[1].address_components[0].long_name;
              //     setFields((prevState) => ({ ...prevState, ["zipCode"]: zipCode }));
              //     console.log("response====",response);
        
              //   },
              //   error => {
              //     console.error(error);
              //   }
              // );
              setFields((prevState) => ({ ...prevState, ["address"]: address }));
              setFields((prevState) => ({ ...prevState, ["longitude"]: lng }));
              setFields((prevState) => ({ ...prevState, ["latitude"]: lat }));
            });
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>{userId ? `User Update` : `User Add`}
            </CardHeader>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
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
                />
                <FormGroup>
                  {/* <InputUI
                    label="Address"
                  /> */}
                  <label>Address</label>

                  <PlacesAutocomplete
                      onChange={handleChange}
                      onSelect={handleSelect}
                      searchOptions={searchOptions}
                      value={fields.address}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>           
                  <Input
                    type="select"
                    name="city"
                    id="city"
                    innerRef={register}
                    value={fields.city}
                    onChange={(e) =>
                      handlechange(e.target.name, e.target.value)
                    }
                  >
                    <option selected disabled>Select A City....</option>
                   {
                      props.city && props.city.cityList.map((val) =>{
                      return(
                        // <option value={val._id}>{val.cityName}</option>
                        <option>{val.cityName}</option>
                      );
                     })
                    } 
                    
                  </Input>
                  <InputUI
                      placeholder="Zip Code"
                      type="number"
                      name="zipCode"
                      errors={errors}
                      innerRef={register({
                        required: "This is required field",
                      })}
                      fields={fields.zipCode}
                      value={fields.zipCode}
                      onChange={(e) =>
                        handlechange(e.target.name, e.target.value)
                      }
                    />
                </FormGroup>

                {!userId && <InputUI
                  label="Password"
                  name="password"
                  type="password"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />}
                {/* Date Of Birth */}
                <InputUI
                  label="Date Of Birth"
                  name="dateOfBirth"
                  type="date"
                  errors={errors}
                  innerRef={register({
                    required: 'This is required field',
                  })}
                  fields={fields}
                />
              {userId ? (
                  <div className="text-center" style={{ height: 150 }}>
                  <img src={getImageUrl(fields.profilePicture)} className="rounded-circle" style={{ height: "100%" }} alt="..." />
                  {/* <img src={'assets/img/dummy-profile-img.png'} class="rounded-circle" width="200" /> */}
                </div>
                ) : (
                  ""
                )}
                <FileInput
                  label="Profile Picture"
                  name="profilePicture"
                  register={register}
                  errors={errors}
                  required={false}
                />
                {userId ? (
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
  const { user,city } = state;
  return {
    user,
    city
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
    resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
    crudActionCityCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "CITY"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserForm));