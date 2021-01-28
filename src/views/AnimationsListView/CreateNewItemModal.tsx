import React, { FunctionComponent, useState } from "react";
import Modal from "react-modal";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { ROOT_NODE_ID } from "../../constants/misc";

Modal.setAppElement(`#${ROOT_NODE_ID}`);

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    createItem: (name: string) => void;
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

const CreateNewItemModal: FunctionComponent<Props> = ({
    isOpen,
    closeModal,
    createItem
}) => {
    const [inputContent, setInputContent] = useState<string>("");

    function create() {
        createItem(inputContent);
        setInputContent("");
    }
    function close() {
        closeModal();
        setInputContent("");
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={close} style={customStyles}>
            <p>Create new item</p>
            <TextInput
                value={inputContent}
                autoFocus={true}
                onChange={(e) => {
                    setInputContent(e.currentTarget.value);
                }}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        create();
                    }
                }}
            />
            <Button onClick={() => create()}>Create</Button>
        </Modal>
    );
};

export default CreateNewItemModal;
