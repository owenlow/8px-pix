import {
    Action,
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { reducer as projectsReducer } from "./projects/reducers";

const rootReducer = combineReducers({
    projects: projectsReducer
});

const store = createStore(rootReducer, compose(...[applyMiddleware(thunk)]));

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
>;

export default store;
