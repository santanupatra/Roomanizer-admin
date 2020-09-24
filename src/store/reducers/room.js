import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    room: null,
    roomList: [],
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
        case 'SET_ROOM_ACTION':
            return setItemAction(state, payload, 'ROOM');
        case 'RESET_ROOM_ACTION':
            return resetItemAction(state, 'ROOM');
        default: return state
    }
}