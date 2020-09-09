import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    setting: null,
    settingList: [
    ],
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
        case 'SET_SETTING_ACTION':
            return setItemAction(state, payload, 'SETTING');
        case 'RESET_USER_ACTION':
            return resetItemAction(state, 'SETTING');
        default: return state
    }
}