import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { DISPLAY_SIZE, FRAME_DATA_LENGTH } from "../../constants/display";
import { RootState } from "../../store";
import {
    thunkGetRemoteProjects,
    thunkUpdateProject
} from "../../store/projects/thunks";
import { ProjectData } from "../../store/projects/types";
import { FrameData } from "../../types";
import ColorPicker from "./ColorPicker";
import FramePicker from "./FramePicker";
import FrameView from "./FrameView";

interface PathVariables {
    projectId: string; // Expected to be a number but `useParams` only allows strings
}

interface QueryParams {
    frameIndexParam?: string;
}

const ProjectBuilderView: FunctionComponent<RouteComponentProps<
    PathVariables
>> = ({
    match: {
        params: { projectId }
    }
}) => {
    const dispatch = useDispatch();

    const { frameIndexParam = "0" } = useParams<QueryParams>();
    const currentProject = useSelector<RootState, ProjectData>(
        (state) => state.projects[projectId]
    );

    const frameIndex = parseInt(frameIndexParam);
    const [currentFrame, setCurrentFrame] = useState<FrameData>([]);

    useEffect(() => {
        if (currentProject) {
            setCurrentFrame(currentProject.frames[frameIndex]);
        }
    }, [currentProject, frameIndex]);

    useEffect(() => {
        dispatch(thunkGetRemoteProjects());
    }, [dispatch]);

    function handleCellClick(index: number) {
        const updatedFrame = [...currentFrame];
        updatedFrame[index] = currentColor;
        setCurrentFrame(updatedFrame);
        currentProject.frames[frameIndex] = updatedFrame;
    }

    const [currentColor, setCurrentColor] = useState<string>("#fff");
    if (!currentProject) {
        return <div>Loading...</div>;
    }

    if (currentFrame && currentFrame.length !== FRAME_DATA_LENGTH) {
        return <div>Invalid grid configuration</div>;
    }

    return (
        <div>
            <FramePicker />
            <FrameView
                frameSize={DISPLAY_SIZE}
                data={currentFrame}
                onCellClick={handleCellClick}
            />
            <ColorPicker
                currentColor={currentColor}
                selectColor={(colorString: string) =>
                    setCurrentColor(colorString)
                }
            />
            <Button
                onClick={() => dispatch(thunkUpdateProject(currentProject))}
            >
                Save to device
            </Button>
        </div>
    );
};

export default ProjectBuilderView;
