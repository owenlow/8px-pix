import React, { FunctionComponent, useEffect, useState } from "react";
import FrameView from "./FrameView";
import ColorPickerView from "./ColorPickerView";
import {getDisplay} from '../../service/display-service';

const FRAME_SIZE = 8; // put this somewhere clever

const AnimationBuilderView: FunctionComponent = () => {
    const [grid, setGrid] = useState<string[]>([]);

    useEffect(function() {
        (async function() {
            const displayData = await getDisplay();
            setGrid(displayData);
        })();
    }, []);

    function handleCellClick(index: number) {
        const newGrid = [...grid];
        newGrid[index] = currentColor;
        setGrid(newGrid);
    }

    const [currentColor, setCurrentColor] = useState<string>("#fff");

    if (grid.length !== Math.pow(FRAME_SIZE, 2)) {
        return <div>Invalid grid configuration</div>;
    }

    return (
        <div>
            <FrameView frameSize={FRAME_SIZE} data={grid} onCellClick={handleCellClick} />
            <ColorPickerView
                initialColor={currentColor}
                onColorPick={(colorString: string) =>
                    setCurrentColor(colorString)
                }
            />
            <button>Save</button>
        </div>
    );
};

export default AnimationBuilderView;
