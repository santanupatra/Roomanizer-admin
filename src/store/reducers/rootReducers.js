import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from './dashboard';
import profile from "./profile";
import user from './user';
import room from './room';
// import chef from './chef';
// import cms from './cms';
// import email from './email';
import setting from './setting';
// import food from './food';
// import service from './service';
// import city from './city'
// import province from './province'

export default combineReducers({
    auth,
    dashboard,
    profile,
    user,
    room,
    // chef,
    // email,
    // cms,
    // food,
    // service,
    setting,
    // city,
    // province,

})