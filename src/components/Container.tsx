import styled from "styled-components";

interface Props {
    centered?: boolean;
}

const Container = styled.div<Props>`
    display: flex;
    flex-direction: column;
    margin: 10px;
    ${({ centered }) => (centered ? "justify-content: center;" : "")}
`;

export default Container;
