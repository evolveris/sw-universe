import { Text, Input } from './InlineEdit.styled'
import { Context } from './../../store/store'
import { useContext, useState } from 'react';

const InlineEdit = () => {
    const [state, dispatch] = useContext(Context);
    const [showInput, setShowInput] = useState(false);
    const [showText, setShowText] = useState(true);

    const handleInputChange = (e) => {
        console.log(e.target.value);
    }

    const handleInlineEditToggle = () => {
        setShowInput(true);
        setShowText(false);
    }

    return(
        <>
            <Text>
                {showText? <Text onClick={handleInlineEditToggle}>{state.currentNode.name}</Text> : null}
                {showInput ? <Input onChange={handleInputChange} placeholder={state.currentNode.name}></Input> : null}
            </Text>
        </>
    )
}

export default InlineEdit