import {
    AnimationData,
    CreateAnimationAction,
    UpdateAnimationAction
} from "./types";

export function createAnimation(animationName: string): CreateAnimationAction {
    return {
        type: "CREATE_ANIMATION",
        payload: animationName
    };
}

export function updateAnimation({
    id,
    frames,
    name
}: AnimationData): UpdateAnimationAction {
    return {
        type: "UPDATE_ANIMATION",
        payload: {
            id,
            name,
            frames
        }
    };
}
