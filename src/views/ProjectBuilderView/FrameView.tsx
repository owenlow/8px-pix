import React, { FunctionComponent } from "react";
import _ from "lodash";
import styled from "styled-components";

import Container from "../../components/Container";

interface Props {
    frameSize: number;
    data: string[];
    onCellClick: (cellIndex: number) => void;
}

const CellRow = styled.div`
    flex-direction: row;
`;

const CellButton = styled.button`
    background: ${({ color }) => color};
    width: 2rem;
    height: 2rem;
`;

const FrameView: FunctionComponent<Props> = ({
    frameSize,
    data,
    onCellClick,
}) => (
    <Container>
        {_.range(0, data.length, frameSize).map((i) => (
            <CellRow>
                {_.range(i, i + frameSize).map((j) => (
                    <CellButton
                        key={j}
                        color={data[j]}
                        onClick={() => onCellClick(j)}
                    />
                ))}
            </CellRow>
        ))}
    </Container>
);

export default FrameView;
