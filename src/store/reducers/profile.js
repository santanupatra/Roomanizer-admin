import {setItemAction,resetItemAction} from '../../shared/commonUpdateState';
const initialState = {
    profile: null,
    action: {
        type: null,
        isSuccess: false,
        data: null
    },
    isLoading: false
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'SET_PROFILE_ACTION' : return setItemAction(state, payload,'PROFILE');
        case 'RESET_PROFILE_ACTION' : return resetItemAction(state,'PROFILE');
        default: return state
    }
}