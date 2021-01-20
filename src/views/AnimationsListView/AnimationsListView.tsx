import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AnimationStoreState } from "../../store/animations/types";
import Button from "../../components/Button";
import { generatePath } from "react-router-dom";
import { ANIMATION_EDITOR } from "../../constants/routes";

const AnimationsListView: FunctionComponent = () => {
    const allAnimations = useSelector<RootState, AnimationStoreState>(
        (state) => state.animations
    );

    function handleCreateNewClick(e: any) {}

    return (
        <div>
            <h1>Select an animation to edit</h1>
            {Object.values(allAnimations).map(({ id, name }) => (
                <div>
                    <a href={generatePath(ANIMATION_EDITOR, { id })}>{name}</a>
                </div>
            ))}
            <Button onClick={handleCreateNewClick}>Create new animation</Button>
        </div>
    );
};

export default AnimationsListView;
