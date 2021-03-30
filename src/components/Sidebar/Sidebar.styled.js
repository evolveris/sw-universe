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
const Button = styled.button`
    position: absolute;
    right: 20px;
    top: 15px;
    background-color: #29a9e0;
    color: white;
    height: 30px;
    width: 30px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius: 5px;
`

const ButtonClose = styled.p`
    margin: 0;
    font-size: 22px;
`

const StyledSidebar = () => {
    return(
        <Container>
            <Button type="button" aria-label="Close">
                <ButtonClose aria-hidden="true" focusable="false">x</ButtonClose>
            </Button>
            <Title>Star Wars Universe Explorer</Title>
            <InlineEdit></InlineEdit>
        </Container>
    )
}

export default StyledSidebar