import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from './dashboard';
import profile from "./profile";
import user from './user';
import room from './room';
// import chef from './chef';
import landlord from './landlord';
import email from './email';
import cms from './cms';
import setting from './setting';
import contact from './contact';
import house from './house'
 import city from './city'
 import animities from './animities'

export default combineReducers({
    auth,
    dashboard,
    animities,
    profile,
    user,
    room,
    house,
    // chef,
    landlord,
    email,
    cms,
    // food,
    // service,
    setting,
    contact,
     city,
    // province,

})