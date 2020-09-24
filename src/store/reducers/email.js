import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
import logo from '../../assets/img/brand/logoemail.png';

const initialState = {
    email: null,
    emailList: [],
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
        case 'SET_EMAIL_ACTION':
            return setItemAction(state, payload, 'EMAIL');
        case 'RESET_EMAIL_ACTION':
            return resetItemAction(state, 'EMAIL');
        default: return state
    }
}