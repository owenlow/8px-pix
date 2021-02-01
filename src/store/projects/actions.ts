import {
    CreateProjectAction,
    CREATE_PROJECT,
    LoadProjectsAction,
    LOAD_PROJECTS,
    ProjectData,
    ProjectStoreState,
    UpdateProjectAction,
    UPDATE_PROJECT
} from "./types";

export const createProject = (projectName: string): CreateProjectAction => ({
    type: CREATE_PROJECT,
    payload: projectName
});

export const updateProject = ({
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

export const loadProjects = (
    storeState: ProjectStoreState
): LoadProjectsAction => ({
    type: LOAD_PROJECTS,
    payload: storeState
});
