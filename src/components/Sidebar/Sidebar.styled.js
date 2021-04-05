import styled from "styled-components";
import InlineEdit from './InlineEdit'
import { Context } from './../../store/store'
import { useContext, useEffect, useState } from 'react';

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
    color: #29a9e0;
    font-family: 'Poller One', cursive;
    font-size: 28px;
`
const Button = styled.button`
    position: absolute;
    right: 10px;
    top: 5px;
    padding: 15px;
    background-color: white;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`

const ButtonClose = styled.span`
    margin: 0;
    font-size: 16px;
    color: #000;
`

const StyledSidebar = () => {
    const [state, dispatch] = useContext(Context);
    const [targets, setTargets] = useState([]);

    const handleSidebarButtonClose = () => {
        dispatch({type: 'SET_SHOW_SIDEBAR', payload: false})
    }

    useEffect(() => {
        state.graph.links.forEach((link) => {
            if (link["sourceName"] === state.currentNode.name) {
                if (!targets.includes(link["targetName"])) {
                    setTargets([...targets, link["targetName"]]);
                }
            }
        })
    }, [state, targets]);

    return(
        <Container>
            <Button type="button" aria-label="Close" onClick={handleSidebarButtonClose}>
                <ButtonClose aria-hidden="true" focusable="false">✖</ButtonClose>
            </Button>
            <Title>Star Wars Universe Explorer</Title>
            <InlineEdit></InlineEdit>
            <p>Associated nodes:</p>
            {targets.length > 0 && targets.map((elem) => {
                return <p key={elem}>{elem}</p>
            })}
        </Container>
    )
}

export default StyledSidebar