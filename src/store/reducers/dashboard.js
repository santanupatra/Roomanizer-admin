import {setItemAction,resetItemAction} from '../../shared/commonUpdateState';
const initialState = {
    dashboard: null,
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
        case 'SET_DASHBOARD_ACTION' : return setItemAction(state, payload,'DASHBOARD');
        case 'RESET_DASHBOARD_ACTION' : return resetItemAction(state,'DASHBOARD');
        default: return state
    }
}