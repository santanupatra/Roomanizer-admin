import React from 'react';

const Dashboard = React.lazy(() => import('./containers/Dashboard/Dashboard'));
const Profile = React.lazy(() => import('./containers/Profile'));
const ChangePass = React.lazy(() => import('./containers/Profile/ChangePassword'));
const UserForm = React.lazy(() => import('./containers/Users/UserForm'));
const UserList = React.lazy(() => import('./containers/Users/UserList'));
const UserDetails = React.lazy(() => import('./containers/Users/UserDetails'));
const RoomForm = React.lazy(() => import('./containers/Room/RoomForm'));
const RoomList = React.lazy(() => import('./containers/Room/RoomList'));
const RoomDetails = React.lazy(() => import('./containers/Room/RoomDetails'));

const LandlordForm = React.lazy(() => import('./containers/Landlord/LandlordForm'));
const LandlordList = React.lazy(() => import('./containers/Landlord/LandlordList'));
const LandlordDetails = React.lazy(() => import('./containers/Landlord/LandlordDetails'));

const CMSForm = React.lazy(() => import('./containers/CMS/CMSForm'));
const CMSList = React.lazy(() => import('./containers/CMS/CMSList'));
const CMSDetails = React.lazy(() => import('./containers/CMS/CMSDetails'));

// const FoodForm = React.lazy(() => import('./containers/Food/FoodForm'));
// const FoodList = React.lazy(() => import('./containers/Food/FoodList'));
// const FoodDetails = React.lazy(() => import('./containers/Food/FoodDetails'));

const CityForm = React.lazy(() => import('./containers/City/CityForm'));
const CityList= React.lazy(() => import('./containers/City/CityList'));
const CityDetails = React.lazy(() => import('./containers/City/CityDetails'));

// const ServiceForm = React.lazy(() => import('./containers/Service/ServiceForm'));
// const ServiceList = React.lazy(() => import('./containers/Service/ServiceList'));
// const ServiceDetails = React.lazy(() => import('./containers/Service/ServiceDetails'));
// const ProvinceForm = React.lazy(() => import('./containers/Province/ProvinceForm'));
// const ProvinceList = React.lazy(() => import('./containers/Province/ProvinceList'));
// const ProvinceDetails = React.lazy(() => import('./containers/Province/ProvinceDetails'));
// const reset = React.lazy(() => import('./containers/Login/reset'));


const EmailForm = React.lazy(() => import('./containers/Email/EmailForm'));
const EmailList = React.lazy(() => import('./containers/Email/EmailList'));
const EmailDetails = React.lazy(() => import('./containers/Email/EmailDetails'));

const SettingForm = React.lazy(() => import('./containers/Setting/SettingForm'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', exact: true, name: 'Prifile', component: Profile },
  { path: '/change-password', name: 'Change Password', component: ChangePass },

  //------------------------------ Manage User --------------------------------
  { path: '/user', exact: true, name: "Users", component: UserList },
  { path: '/user/add', name: "Add", component: UserForm },
  { path: '/user/edit/:userId', name: "Edit", component: UserForm },
  { path: '/user/list', name: "List", component: UserList },
  { path: '/user/details/:userId', name: "Details", component: UserDetails },
  //------------------------------ Manage Room --------------------------------
  { path: '/room', exact: true, name: "Rooms", component: RoomList },
  { path: '/room/add', name: "Add", component: RoomForm },
  { path: '/room/edit/:roomId', name: "Edit", component: RoomForm },
  { path: '/room/list', name: "List", component: RoomList },
  { path: '/room/details/:roomId', name: "Details", component: RoomDetails },
  //------------------------------ reset --------------------------------
  // { path: '/reset', name: 'reset', component: reset },
//   { path: '/chef', exact: true, name: "Chef", component: ChefList },
//   { path: '/chef/add', name: "Add", component: ChefForm },
//   { path: '/chef/edit/:chefId', name: "Edit", component: ChefForm },
//   { path: '/chef/list', name: "List", component: ChefList },
//   { path: '/chef/details/:chefId', name: "Details", component: ChefDetails },

  // ------------------------------ Manage Landlord --------------------------------
  { path: '/landlord', exact: true, name: "Landlord", component: LandlordList },
  { path: '/landlord/add', name: "Add", component: LandlordForm },
  { path: '/landlord/edit/:landlordId', name: "Edit", component: LandlordForm },
  { path: '/landlord/list', name: "List", component: LandlordList },
  { path: '/landlord/details/:landlordId', name: "Details", component: LandlordDetails },

  //------------------------------ Manage CMS --------------------------------
  { path: '/cms', exact: true, name: "CMS", component: CMSList },
  { path: '/cms/add', name: "Add", component: CMSForm },
  { path: '/cms/edit/:cmsId', name: "Edit", component: CMSForm },
  { path: '/cms/list', name: "List", component: CMSList },
  { path: '/cms/details/:cmsId', name: "Details", component: CMSDetails },

// //------------------------------ Manage Food --------------------------------
//   { path: '/food', exact: true, name: "Food", component: FoodList },
//   { path: '/food/add', name: "Add", component: FoodForm },
//   { path: '/food/edit/:foodId', name: "Edit", component: FoodForm },
//   { path: '/food/list', name: "List", component: FoodList },
//   { path: '/food/details/:foodId', name: "Details", component: FoodDetails },

//   //------------------------------ Manage Service --------------------------------
//   { path: '/service', exact: true, name: "Service", component: ServiceList },
//   { path: '/service/add', name: "Add", component: ServiceForm },
//   { path: '/service/edit/:serviceId', name: "Edit", component: ServiceForm },
//   { path: '/service/list', name: "List", component: ServiceList },
//   { path: '/service/details/:serviceId', name: "Details", component: ServiceDetails },

 //-----------------------------Manage City------------------------------------
 { path: '/city', exact: true, name: "City", component: CityList },
 { path: '/city/add', name: "Add", component: CityForm },
 { path: '/city/edit/:cityId', name: "Edit", component: CityForm },
 { path: '/city/list', name: "List", component: CityList },
 { path: '/city/details/:cityId', name: "Details", component: CityDetails },

//  //-----------------------------Manage Province------------------------------------
//  { path: '/province', exact: true, name: "Province", component: ProvinceList },
//  { path: '/province/add', name: "Add", component: ProvinceForm },
//  { path: '/province/edit/:provinceId', name: "Edit", component: ProvinceForm },
//  { path: '/province/list', name: "List", component: ProvinceList },
//  { path: '/province/details/:provinceId', name: "Details", component: ProvinceDetails },
  
//   //------------------------------ Manage Email --------------------------------
  { path: '/email', exact: true, name: "Email", component: EmailList },
  { path: '/email/add', name: "Add", component: EmailForm },
  { path: '/email/edit/:emailId', name: "Edit", component: EmailForm },
  { path: '/email/list', name: "List", component: EmailList },
  { path: '/email/details/:emailId', name: "Details", component: EmailDetails },

  //------------------------------ Manage Setting --------------------------------
  { path: '/setting', exact: true, name: "Setting", component: SettingForm },

];

export default routes;
