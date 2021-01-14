import { Action } from "redux";

export interface AnimationState {
    name: string;
    frames: string[];
}

interface SaveAnimationAction extends Action {
    type: "SAVE_ANIMATION";
    payload?: AnimationState;
}

export type AnimationActionTypes = SaveAnimationAction;
