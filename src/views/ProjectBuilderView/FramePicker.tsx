import _ from "lodash";
import React, { FunctionComponent } from "react";
import Button from "../../components/Button";

interface Props {
    frameCount: number;
    currentFrameIndex: number;
    handleSwitchFrameClick: (index: number) => void;
    handleAddFrameClick: () => void;
    handleDeleteFrameClick: () => void;
}

const FramePicker: FunctionComponent<Props> = ({
    frameCount,
    currentFrameIndex,
    handleSwitchFrameClick,
    handleAddFrameClick,
    handleDeleteFrameClick
}) => (
    <>
        <div>
            {_.range(0, frameCount).map((index) => (
                <button
                    onClick={() => handleSwitchFrameClick(index)}
                    key={index}
                    style={{
                        backgroundColor:
                            currentFrameIndex === index ? "orange" : ""
                    }}
                >
                    {index}
                </button>
            ))}
        </div>
        <div>
            <Button onClick={handleAddFrameClick}>Add frame</Button>
            <Button onClick={handleDeleteFrameClick}>Delete current</Button>
        </div>
    </>
);

export default FramePicker;
