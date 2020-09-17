import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    landlord: null,
    landlordList: [],
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
        case 'SET_LANDLORD_ACTION':
            return setItemAction(state, payload, 'LANDLORD');
        case 'RESET_LANDLORD_ACTION':
            return resetItemAction(state, 'LANDLORD');
        default: return state
    }
}