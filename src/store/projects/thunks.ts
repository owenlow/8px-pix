import { ThunkDispatch } from "redux-thunk";
import { getProjectData, setProjectData } from "../../service/display-service";
import { AppThunk, RootState } from "../index";
import {
    createProject,
    deleteProject,
    loadProjects,
    updateProject
} from "./actions";
import {
    CreateProjectAction,
    DeleteProjectAction,
    ProjectData,
    UpdateProjectAction
} from "./types";

export const thunkCreateProject = (projectName: string): AppThunk => (
    dispatch: ThunkDispatch<RootState, any, CreateProjectAction>
): void => {
    dispatch(createProject(projectName));
    dispatch(thunkUpdateRemoteProjects());
};

export const thunkUpdateProject = (project: ProjectData): AppThunk => (
    dispatch: ThunkDispatch<RootState, any, UpdateProjectAction>
): void => {
    dispatch(updateProject(project));
    dispatch(thunkUpdateRemoteProjects());
};

export const thunkDeleteProject = (projectId: string): AppThunk => (
    dispatch: ThunkDispatch<RootState, any, DeleteProjectAction>
): void => {
    dispatch(deleteProject(projectId));
    dispatch(thunkUpdateRemoteProjects());
};

const thunkUpdateRemoteProjects = (): AppThunk => async (
    dispatch: ThunkDispatch<RootState, any, any>,
    getState
): Promise<void> => setProjectData(getState().projects);

export const thunkGetRemoteProjects = (): AppThunk => async (
    dispatch: ThunkDispatch<RootState, any, any>
): Promise<void> => {
    const data = await getProjectData();
    dispatch(loadProjects(data));
};
