import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Button from "../../components/Button";
import { DISPLAY_SIZE, FRAME_DATA_LENGTH } from "../../constants/display";
import { RootState } from "../../store";
import {
    thunkGetRemoteProjects,
    thunkUpdateProject
} from "../../store/projects/thunks";
import { ProjectData } from "../../store/projects/types";
import { FrameData } from "../../types";
import { useQuery } from "../../utils/hooks";
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
    },
    history
}) => {
    const dispatch = useDispatch();

    const { frameIndexParam } = useQuery<QueryParams>();
    const currentProjectStoreCopy = useSelector<RootState, ProjectData>(
        (state) => state.projects[projectId]
    );
    const [currentProject, setCurrentProject] = useState<ProjectData | null>(
        null
    );

    let frameIndex = parseInt(frameIndexParam || "0");
    if (frameIndex >= (currentProject?.frames.length ?? 0)) {
        frameIndex = 0;
    }
    const [currentFrame, setCurrentFrame] = useState<FrameData>([]);

    useEffect(() => {
        setCurrentProject(currentProjectStoreCopy);
    }, [currentProjectStoreCopy]);

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
        currentProject!.frames[frameIndex] = updatedFrame;
        setCurrentProject(currentProject);
    }

    function handleSwitchFrame(index: number) {
        history.push({
            search:
                "?" +
                new URLSearchParams({
                    frameIndexParam: index.toString()
                }).toString()
        });
    }

    function handleAddFrame() {
        setCurrentProject({
            ...currentProject!,
            frames: [...currentProject!.frames, Array(64).fill("#000")]
        });
    }
    function handleDeleteFrame() {
        currentProject!.frames.splice(frameIndex, 1);
        if (frameIndex >= currentProject!.frames.length) {
            history.push({
                search:
                    "?" +
                    new URLSearchParams({
                        frameIndexParam: "0"
                    }).toString()
            });
        }
        setCurrentProject(currentProject);
    }

    const [currentColor, setCurrentColor] = useState<string>("#fff");
    if (!currentProject) {
        return <div>Loading...</div>;
    }

    // TODO: improve validation and move logic to separate file
    if (currentFrame && currentFrame.length !== FRAME_DATA_LENGTH) {
        return <div>Invalid grid configuration</div>;
    }

    return (
        <div>
            <FramePicker
                frameCount={currentProject.frames.length}
                currentFrameIndex={frameIndex}
                handleSwitchFrameClick={handleSwitchFrame}
                handleAddFrameClick={handleAddFrame}
                handleDeleteFrameClick={handleDeleteFrame}
            />
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
