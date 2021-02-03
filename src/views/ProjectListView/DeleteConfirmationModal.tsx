import React, { FunctionComponent } from "react";
import Modal from "react-modal";
import Button from "../../components/Button";
import { ROOT_NODE_ID } from "../../constants/misc";
import { ProjectData } from "../../store/projects/types";

Modal.setAppElement(`#${ROOT_NODE_ID}`);

interface Props {
    closeModal: () => void;
    deleteItem: (name: string) => void;
    projectToDelete: ProjectData;
}

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

const DeleteConfirmationModal: FunctionComponent<Props> = ({
    closeModal,
    deleteItem,
    projectToDelete
}) => (
    <Modal
        isOpen={true}
        onRequestClose={() => closeModal()}
        style={customStyles}
    >
        <p>Are you sure you want to delete {projectToDelete.name}?</p>
        <Button onClick={() => deleteItem(projectToDelete.id)}>Delete</Button>
    </Modal>
);

export default DeleteConfirmationModal;
