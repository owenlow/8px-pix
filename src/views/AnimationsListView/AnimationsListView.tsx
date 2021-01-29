import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath } from "react-router-dom";
import Button from "../../components/Button";
import { PROJECT_EDITOR } from "../../constants/routes";
import { RootState } from "../../store";
import { createProject } from "../../store/projects/actions";
import { ProjectStoreState } from "../../store/projects/types";
import CreateNewItemModal from "./CreateNewItemModal";

const AnimationsListView: FunctionComponent = () => {
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState<
        boolean
    >(false);

    const allProjects = useSelector<RootState, ProjectStoreState>(
        (state) => state.projects
    );
    const dispatch = useDispatch();

    function handleCreateNewClick() {
        setCreateProjectModalOpen(true);
    }

    function closeModal() {
        setCreateProjectModalOpen(false);
    }

    function handleModalCreate(name: string) {
        dispatch(createProject(name));
        setCreateProjectModalOpen(false);
    }

    return (
        <div>
            <CreateNewItemModal
                isOpen={createProjectModalOpen}
                closeModal={closeModal}
                createItem={handleModalCreate}
            />
            <h1>Select a project to edit</h1>
            {Object.values(allProjects).map(({ id, name }) => (
                <div>
                    <a href={generatePath(PROJECT_EDITOR, { id })}>{name}</a>
                </div>
            ))}
            <Button onClick={handleCreateNewClick}>Create new animation</Button>
        </div>
    );
};

export default AnimationsListView;
