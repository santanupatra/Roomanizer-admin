import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    house: null,
    houseList: [],
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
        case 'SET_HOUSE_ACTION':
            return setItemAction(state, payload, 'HOUSE');
        case 'RESET_HOUSE_ACTION':
            return resetItemAction(state, 'HOUSE');
        default: return state
    }
}