import _ from "lodash";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Container from "../../components/Container";

interface Props {
    frameSize: number;
    data: string[];
    onCellClick: (cellIndex: number) => void;
}

interface CellGridProps {
    frameSize: number;
    cellSize: number;
}

const CellGrid = styled.div<CellGridProps>`
    display: grid;
    grid-template-rows: ${({ frameSize, cellSize }) =>
        `repeat(${frameSize}, ${cellSize}px)`};
    grid-template-columns: ${({ frameSize, cellSize }) =>
        `repeat(${frameSize}, ${cellSize}px)`};
    grid-auto-rows: 30px;
    grid-gap: 5px;
    margin: auto;
`;

interface CellButtonProps {
    color: string;
    cellSizePx: number;
}

const CellButton = styled.button<CellButtonProps>`
    background: ${({ color }) => color};
    width: ${({ cellSizePx }) => cellSizePx}px;
    height: ${({ cellSizePx }) => cellSizePx}px;
    border: none;
    margin: 0;
    padding: 0;
`;

const CELL_SIZE = 40;

const FrameView: FunctionComponent<Props> = ({
    frameSize,
    data,
    onCellClick
}) => (
    <Container>
        <CellGrid frameSize={frameSize} cellSize={CELL_SIZE}>
            {_.range(0, data.length).map((i) => (
                <CellButton
                    key={i}
                    color={data[i]}
                    cellSizePx={CELL_SIZE}
                    onClick={() => onCellClick(i)}
                />
            ))}
        </CellGrid>
    </Container>
);

export default FrameView;
