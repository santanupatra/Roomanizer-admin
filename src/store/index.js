import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducers from "../store/reducers";
export default function configureStore(initialState = {}) {
    return createStore(
        rootReducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    );
}
