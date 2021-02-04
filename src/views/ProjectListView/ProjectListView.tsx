import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath } from "react-router-dom";
import Anchor from "../../components/Anchor";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import ListContainer from "../../components/ListContainer";
import ListItem from "../../components/ListItem";
import Text from "../../components/Text";
import { PROJECT_EDITOR } from "../../constants/routes";
import { RootState } from "../../store";
import {
    thunkCreateProject,
    thunkDeleteProject,
    thunkGetRemoteProjects
} from "../../store/projects/thunks";
import { ProjectData, ProjectStoreState } from "../../store/projects/types";
import CreateNewItemModal from "./CreateNewItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const ProjectListView: FunctionComponent = () => {
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState<
        boolean
    >(false);
    const [projectToDelete, setProjectToDelete] = useState<ProjectData | null>(
        null
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetRemoteProjects());
    }, [dispatch]);
    const allProjects = useSelector<RootState, ProjectStoreState>(
        (state) => state.projects
    );

    function handleDeleteClick(project: ProjectData) {
        setProjectToDelete(project);
    }

    function handleCreateNewClick() {
        setCreateProjectModalOpen(true);
    }

    function closeCreateModal() {
        setCreateProjectModalOpen(false);
    }
    function closeDeleteModal() {
        setProjectToDelete(null);
    }

    function handleModalCreate(name: string) {
        dispatch(thunkCreateProject(name));
        setCreateProjectModalOpen(false);
    }

    function handleModalDelete(id: string) {
        dispatch(thunkDeleteProject(id));
        setProjectToDelete(null);
    }

    return (
        <div>
            {projectToDelete && (
                <DeleteConfirmationModal
                    closeModal={closeDeleteModal}
                    deleteItem={handleModalDelete}
                    projectToDelete={projectToDelete}
                />
            )}
            <CreateNewItemModal
                isOpen={createProjectModalOpen}
                closeModal={closeCreateModal}
                createItem={handleModalCreate}
            />
            <h1>All Projects</h1>
            <ListContainer width={"20rem"}>
                {Object.values(allProjects).map((project) => (
                    <Anchor
                        href={generatePath(PROJECT_EDITOR, {
                            projectId: project.id
                        })}
                    >
                        <ListItem>
                            <Text>{project.name}</Text>
                            <IconButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDeleteClick(project);
                                }}
                            >
                                🗑
                            </IconButton>
                        </ListItem>
                    </Anchor>
                ))}
            </ListContainer>
            <Button onClick={handleCreateNewClick}>Create new animation</Button>
        </div>
    );
};

export default ProjectListView;
