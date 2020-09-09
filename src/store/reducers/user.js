import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    user: null,
    userList: [],
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
        case 'SET_USER_ACTION':
            return setItemAction(state, payload, 'USER');
        case 'RESET_USER_ACTION':
            return resetItemAction(state, 'USER');
        default: return state
    }
}