import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    contact: null,
    contactList: [],
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
        case 'SET_CONTACT_ACTION':
            return setItemAction(state, payload, 'CONTACT');
        case 'RESET_CONTACT_ACTION':
            return resetItemAction(state, 'CONTACT');
        default: return state
    }
}