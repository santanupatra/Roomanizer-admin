import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    animities: null,
    animitiesList: [],
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
        case 'SET_ANIMITIES_ACTION':
            return setItemAction(state, payload, 'ANIMITIES');
        case 'RESET_ANIMITIES_ACTION':
            return resetItemAction(state, 'ANIMITIES');
        default: return state
    }
}