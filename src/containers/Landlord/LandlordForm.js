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
import { LANDLORD_URL } from '../../shared/allApiUrl';
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

function LandlordForm(props) {

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
  const [landlordId, setLandlordId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;

  useEffect(() => {
    setLandlordId(params.landlordId)
    if (params.landlordId) props.crudActionCall(`${LANDLORD_URL}/${params.landlordId}`, null, "GET")
  }, [params]);

  useEffect(() => {
    const action = props.landlord.action;
    if (props.landlord.landlord && params.landlordId) {
      setFields({ ...fields, ...props.landlord.landlord })
    }
    if (action.isSuccess && action.type === "ADD" || action.type === "UPDATE")
      props.history.push("/landlord/list")

  }, [props.landlord]);

  const onSubmit = (data) => {
    data.longitude = fields.longitude;
    data.latitude = fields.latitude;
    data.address = fields.address;
    data.profilePicture = data.profilePicture[0];
    if (landlordId) data.landlordId = landlordId;
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    if (landlordId) {
      props.crudActionCall(LANDLORD_URL + `/${landlordId}`, formData, landlordId ? "UPDATE" : "ADD");
    }
    else {
      props.crudActionCall(LANDLORD_URL, formData, landlordId ? "UPDATE" : "ADD");
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
              <i className="fa fa-edit"></i>{landlordId ? `Landlord Update` : `Landlord Add`}
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
                  {/* <Input
                    type="select"
                    name="city"
                    id="city"
                    innerRef={register}
                    value={fields.city}
                    onChange={(e) =>
                      handlechange(e.target.name, e.target.value)
                    }
                  >
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
                    
                  </Input> */}
                
             
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

                {!landlordId && <InputUI
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
              {landlordId ? (
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
                {landlordId ? (
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
  const { landlord } = state;
  return {
    landlord
  }
}

const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "LANDLORD")),
    resetAction: () => dispatch({ type: "RESET_LANDLORD_ACTION" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandlordForm));