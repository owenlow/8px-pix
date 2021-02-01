import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath } from "react-router-dom";
import Button from "../../components/Button";
import { PROJECT_EDITOR } from "../../constants/routes";
import { RootState } from "../../store";
import {
    thunkCreateProject,
    thunkGetRemoteProjects
} from "../../store/projects/thunks";
import { ProjectStoreState } from "../../store/projects/types";
import CreateNewItemModal from "./CreateNewItemModal";

const ProjectListView: FunctionComponent = () => {
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState<
        boolean
    >(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetRemoteProjects());
    }, []);
    const allProjects = useSelector<RootState, ProjectStoreState>(
        (state) => state.projects
    );

    function handleCreateNewClick() {
        setCreateProjectModalOpen(true);
    }

    function closeModal() {
        setCreateProjectModalOpen(false);
    }

    function handleModalCreate(name: string) {
        dispatch(thunkCreateProject(name));
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
                    <a href={generatePath(PROJECT_EDITOR, { projectId: id })}>
                        {name}
                    </a>
                </div>
            ))}
            <Button onClick={handleCreateNewClick}>Create new animation</Button>
        </div>
    );
};

export default ProjectListView;
