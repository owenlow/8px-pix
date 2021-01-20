import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import FrameView from "./FrameView";
import ColorPicker from "./ColorPicker";
import { getDisplay, setDisplay } from "../../service/display-service";
import Button from "../../components/Button";
import FramePicker from "./FramePicker";
import { FrameData } from "../../types";
import { DISPLAY_SIZE, FRAME_DATA_LENGTH } from "../../constants/display";

interface Props {
    id: string;
}

const AnimationBuilderView: FunctionComponent<RouteComponentProps<
    Props
>> = () => {
    const [pendingData, setPendingData] = useState<boolean>(true);
    const [grid, setGrid] = useState<FrameData>([]);

    useEffect(() => {
        (async () => {
            const displayData = await getDisplay();
            setGrid(displayData);
            setPendingData(false);
        })();
    }, []);

    function handleCellClick(index: number) {
        const newGrid = [...grid];
        newGrid[index] = currentColor;
        setGrid(newGrid);
    }

    const [currentColor, setCurrentColor] = useState<string>("#fff");

    if (pendingData) {
        return <div>Loading...</div>;
    }

    if (grid.length !== FRAME_DATA_LENGTH) {
        return <div>Invalid grid configuration</div>;
    }

    return (
        <div>
            <FramePicker />
            <FrameView
                frameSize={DISPLAY_SIZE}
                data={grid}
                onCellClick={handleCellClick}
            />
            <ColorPicker
                currentColor={currentColor}
                selectColor={(colorString: string) =>
                    setCurrentColor(colorString)
                }
            />
            <Button onClick={() => setDisplay(grid)}>Save to device</Button>
        </div>
    );
};

export default AnimationBuilderView;
