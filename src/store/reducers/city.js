import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    city: null,
    cityList: [],
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
        case 'SET_CITY_ACTION':
            return setItemAction(state, payload, 'CITY');
        case 'RESET_CITY_ACTION':
            return resetItemAction(state, 'CITY');
        default: return state
    }
}