import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    aminities: null,
    aminitiesList: [],
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
        case 'SET_AMINITIES_ACTION':
            return setItemAction(state, payload, 'AMINITIES');
        case 'RESET_AMINITIES_ACTION':
            return resetItemAction(state, 'AMINITIES');
        default: return state
    }
}