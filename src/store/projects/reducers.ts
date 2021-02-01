import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { FRAME_DATA_LENGTH } from "../../constants/display";
import {
    CreateProjectAction,
    CREATE_PROJECT,
    DeleteProjectAction,
    DELETE_PROJECT,
    LOAD_PROJECTS,
    ProjectStoreActionTypes,
    ProjectStoreState,
    UpdateProjectAction,
    UPDATE_PROJECT
} from "./types";

const initialState: ProjectStoreState = {};

function createProject(
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
            frames: [Array(FRAME_DATA_LENGTH).fill("#000")]
        }
    };
}

function updateProject(
    state: ProjectStoreState,
    action: UpdateProjectAction
): ProjectStoreState {
    return {
        ...state,
        [action.payload.id]: action.payload
    };
}

function deleteProject(
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
        case CREATE_PROJECT:
            return createProject(state, action);
        case UPDATE_PROJECT:
            return updateProject(state, action);
        case DELETE_PROJECT:
            return deleteProject(state, action);
        case LOAD_PROJECTS:
            return action.payload;
    }
    return state;
};
