import { Action, combineReducers, createStore } from "redux";
import { ThunkAction } from "redux-thunk";
import { reducer as projectsReducer } from "./projects/reducers";

const rootReducer = combineReducers({
    projects: projectsReducer
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
