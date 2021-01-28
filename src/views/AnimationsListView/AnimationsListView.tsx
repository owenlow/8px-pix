import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath } from "react-router-dom";
import Button from "../../components/Button";
import { ANIMATION_EDITOR } from "../../constants/routes";
import { RootState } from "../../store";
import { createAnimation } from "../../store/animations/actions";
import { AnimationStoreState } from "../../store/animations/types";
import CreateNewItemModal from "./CreateNewItemModal";

const AnimationsListView: FunctionComponent = () => {
    const [createNewModalOpen, setCreateNewModalOpen] = useState<boolean>(
        false
    );

    const allAnimations = useSelector<RootState, AnimationStoreState>(
        (state) => state.animations
    );
    const dispatch = useDispatch();

    function handleCreateNewClick() {
        setCreateNewModalOpen(true);
    }

    function closeModal() {
        setCreateNewModalOpen(false);
    }

    function handleModalCreate(name: string) {
        dispatch(createAnimation(name));
        setCreateNewModalOpen(false);
    }

    return (
        <div>
            <CreateNewItemModal
                isOpen={createNewModalOpen}
                closeModal={closeModal}
                createItem={handleModalCreate}
            />
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
