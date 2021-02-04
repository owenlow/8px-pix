import styled from "styled-components";

interface Props {
    width?: string;
}

const ListContainer = styled.div<Props>`
    text-align: left;
    margin: 0 auto;
    ${({ width }) => (width ? `width: ${width};` : "")}
`;

export default ListContainer;
