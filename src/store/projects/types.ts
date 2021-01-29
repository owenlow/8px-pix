import { Action } from "redux";
import { FrameData } from "../../types";

export interface ProjectData {
    id: string;
    name: string;
    frames: FrameData;
}

export interface ProjectStoreState {
    [id: string]: ProjectData;
}

export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

export interface CreateProjectAction extends Action {
    type: typeof CREATE_PROJECT;
    payload: string;
}

export interface UpdateProjectAction extends Action {
    type: typeof UPDATE_PROJECT;
    payload: ProjectData;
}

export interface DeleteProjectAction extends Action {
    type: typeof DELETE_PROJECT;
    payload: string;
}

export type ProjectStoreActionTypes =
    | CreateProjectAction
    | UpdateProjectAction
    | DeleteProjectAction;
