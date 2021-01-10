import React, { FunctionComponent, useEffect, useState } from "react";
import FrameView from "./FrameView";
import ColorPicker from "./ColorPicker";
import { getDisplay, setDisplay } from "../../service/display-service";

const FRAME_SIZE = 8; // put this somewhere clever

const AnimationBuilderView: FunctionComponent = () => {
    const [pendingData, setPendingData] = useState<boolean>(true);
    const [grid, setGrid] = useState<string[]>([]);

    useEffect(function () {
        (async function () {
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

    if (grid.length !== Math.pow(FRAME_SIZE, 2)) {
        return <div>Invalid grid configuration</div>;
    }

    return (
        <div>
            <FrameView
                frameSize={FRAME_SIZE}
                data={grid}
                onCellClick={handleCellClick}
            />
            <ColorPicker
                currentColor={currentColor}
                selectColor={(colorString: string) =>
                    setCurrentColor(colorString)
                }
            />
            <button onClick={() => setDisplay(grid)}>Save to device</button>
        </div>
    );
};

export default AnimationBuilderView;
