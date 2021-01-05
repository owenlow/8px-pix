import React, { FunctionComponent, useState } from "react";

interface Props {
    initialColor?: string;
    onColorPick: (colorString: string) => void;
}

const ColorPickerView: FunctionComponent<Props> = ({
    initialColor = "#000",
    onColorPick,
}) => {
    const [colorInputValue, setColorInputValue] = useState(initialColor);
    return (
        <div>
            <input
                type={"text"}
                value={colorInputValue}
                onChange={(e) => setColorInputValue(e.target.value)}
            />
            <button
                onClick={() => {
                    onColorPick(colorInputValue);
                }}
            >
                Set color
            </button>
        </div>
    );
};

export default ColorPickerView;
