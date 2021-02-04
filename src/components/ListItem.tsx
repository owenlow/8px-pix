import styled from "styled-components";

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    background: #fff;
    border-radius: 5px;
    margin: 4px 0;
    padding: 0.5rem 1rem;

    & > :first-child {
        flex-grow: 1;
    }
`;

export default ListItem;
