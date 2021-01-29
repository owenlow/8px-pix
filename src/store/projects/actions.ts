import {
    CreateProjectAction,
    CREATE_PROJECT,
    ProjectData,
    UpdateProjectAction,
    UPDATE_PROJECT
} from "./types";

export const createProject = (projectName: string): CreateProjectAction => ({
    type: CREATE_PROJECT,
    payload: projectName
});

export const updateAnimation = ({
    id,
    frames,
    name
}: ProjectData): UpdateProjectAction => ({
    type: UPDATE_PROJECT,
    payload: {
        id,
        name,
        frames
    }
});
