import { EditableText, Input } from './InlineEdit.styled'
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
            <p>
                {showText ?
                    <>   
                        <EditableText onClick={handleInlineEditToggle}>{state.currentNode.name}</EditableText> 
                    </> 
                    
                    : null
                }
                {showInput ? 
                    <>
                        <label htmlFor="nodeNameInput">Node name</label> 
                        <Input onChange={handleInputChange} id="nodeNameInput" type="text" placeholder={state.currentNode.name}></Input> 
                    </>
                    : null
                }
            </p>
        </>
    )
}

export default InlineEdit