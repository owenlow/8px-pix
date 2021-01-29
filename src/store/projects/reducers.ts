import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { FRAME_DATA_LENGTH } from "../../constants/display";
import {
    CreateProjectAction,
    DeleteProjectAction,
    ProjectStoreActionTypes,
    ProjectStoreState,
    UpdateProjectAction
} from "./types";

const initialState: ProjectStoreState = {
    foo123: {
        id: "foo123",
        name: "Dummy animation",
        frames: Array(64).fill("#fff")
    }
};

function createAnimation(
    state: ProjectStoreState,
    action: CreateProjectAction
): ProjectStoreState {
    const name = action.payload;
    const id = uuidv4();
    return {
        ...state,
        [id]: {
            id,
            name,
            frames: Array(FRAME_DATA_LENGTH).fill("#000")
        }
    };
}

function updateAnimation(
    state: ProjectStoreState,
    action: UpdateProjectAction
): ProjectStoreState {
    return {
        ...state,
        [action.payload.id]: action.payload
    };
}

function deleteAnimation(
    state: ProjectStoreState,
    action: DeleteProjectAction
): ProjectStoreState {
    const { [action.payload]: omitted, ...rest } = state;
    return rest;
}

export const reducer: Reducer<ProjectStoreState, ProjectStoreActionTypes> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "CREATE_ANIMATION":
            return createAnimation(state, action);
        case "UPDATE_ANIMATION":
            return updateAnimation(state, action);
        case "DELETE_ANIMATION":
            return deleteAnimation(state, action);
    }
    return state;
};
