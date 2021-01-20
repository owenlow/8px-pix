import React, { ChangeEvent, FunctionComponent } from "react";
import styles from "./ColorPicker.module.css";

interface Props {
    currentColor: string;
    selectColor: (colorString: string) => void;
}

const ColorPicker: FunctionComponent<Props> = ({
    currentColor,
    selectColor
}) => {
    function onColorInputChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const colorValue = event.currentTarget.value;
        selectColor(colorValue);
    }

    return (
        <div className={styles.colorPickerContainer}>
            <input type={"text"} onChange={onColorInputChange} />
            <div
                style={{
                    width: "2rem",
                    height: "2rem",
                    backgroundColor: currentColor
                }}
            />
        </div>
    );
};

export default ColorPicker;
