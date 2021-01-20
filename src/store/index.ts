import { combineReducers, createStore } from "redux";
import { reducer as animationsReducer } from "./animations/reducers";

const rootReducer = combineReducers({
    animations: animationsReducer
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
