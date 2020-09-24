import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    cms: null,
    cmsList: [],
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
        case 'SET_CMS_ACTION':
            return setItemAction(state, payload, 'CMS');
        case 'RESET_CMS_ACTION':
            return resetItemAction(state, 'CMS');
        default: return state
    }
}