import React, { FunctionComponent } from "react";
import _ from "lodash";
import styled from "styled-components";

interface Props {
    frameSize: number;
    data: string[];
    onCellClick: (cellIndex: number) => void;
}

function coordinatesToCellIndex(
    x: number,
    y: number,
    frameSize: number
): number {
    return y * frameSize + x;
}

const CellButton = styled.button`
    background: ${({color}) => color};
    width: 2rem;
    height: 2rem;
`;

const FrameView: FunctionComponent<Props> = ({
    frameSize,
    data,
    onCellClick,
}) => (
    <div>
        {_.range(0, data.length).map((index) => {
            return (
                <>
                    <CellButton color={data[index]} onClick={() => onCellClick(index)} />
                    {(index + 1) % frameSize === 0 ? <br /> : null}
                </>
            );
        })}
    </div>
);

export default FrameView;
