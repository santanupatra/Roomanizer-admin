import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
import logo from '../../assets/img/brand/abc-chef-logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { PROFILE_URL } from "../../shared/allApiUrl";
import { getAuthUserId, getImageUrl } from '../../shared/helpers';
import { connect } from "react-redux";
import { crudAction } from "../../store/actions/common";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const DefaultHeader = props => { {
  const initialFields = {
    name: "",
    email: "",
    profilePicture: null
  }
  const [fields, setFields] = useState(initialFields);
    const { children, ...attributes } = props;

    useEffect(() => {
      props.crudActionCall(`${PROFILE_URL}/${props.auth.adminId?props.auth.adminId:getAuthUserId}`, null, "GET")
      return () => {
        // cleanup
      }
    }, [props.profile.action.type])
    useEffect(() => {
      console.log(props.profile.profile)
      if (props.profile.profile) {
        setFields({...fields,...props.profile.profile})
      }
  
    }, [props.profile]);
console.log("from header===>>>",props.auth);
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={getImageUrl(fields.profilePicture)} className="img-avatar" alt="admin" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem><Link to='/profile' className="nav-link"><i className="fa fa-user"></i> Profile</Link></DropdownItem>
              <DropdownItem><Link to='/change-password' className="nav-link"><i className="fa fa-unlock"></i> Change Password</Link></DropdownItem>
              <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-sign-out"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => {
  const { profile, auth } = state;
  return {
    profile,
    auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "PROFILE"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
