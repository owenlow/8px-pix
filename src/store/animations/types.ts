import { Action } from "redux";
import { FrameData } from "../../types";

export interface AnimationData {
    id: string;
    name: string;
    frames: FrameData;
}

export interface AnimationStoreState {
    [id: string]: AnimationData;
}

export interface CreateAnimationAction extends Action {
    type: "CREATE_ANIMATION";
    payload: string;
}

export interface UpdateAnimationAction extends Action {
    type: "UPDATE_ANIMATION";
    payload: AnimationData;
}

export interface DeleteAnimationAction extends Action {
    type: "DELETE_ANIMATION";
    payload: string;
}

export type AnimationStoreActionTypes =
    | CreateAnimationAction
    | UpdateAnimationAction
    | DeleteAnimationAction;
