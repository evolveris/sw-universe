import styled from "styled-components";
import InlineEdit from './InlineEdit'

const Container = styled.div`
    background-color: white;
    width: 20%;
    height: 70vh;
    right: 0;
    position: absolute;
    z-index: 2;
    top: 0;
    padding: 30px 30px;
    margin: 30px;
    box-shadow: 2px 2px 10px 0 #b7c7cc;
    border-radius: 5px;
`


const Title = styled.h3`
    color: black;
`

const StyledSidebar = () => {
    return(
        <Container>
            <Title>Star Wars Universe Explorer</Title>
            <InlineEdit></InlineEdit>
        </Container>
    )
}

export default StyledSidebar