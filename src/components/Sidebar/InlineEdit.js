import { EditableText, Input } from './InlineEdit.styled'
import { Context } from './../../store/store'
import { useContext, useState } from 'react';

const InlineEdit = ({ text }) => {
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
                        <EditableText onClick={handleInlineEditToggle}>{text}</EditableText> 
                    </> 
                    
                    : null
                }
                {showInput ? 
                    <>
                        <label htmlFor="nodeNameInput">Edit node</label> 
                        <Input onChange={handleInputChange} id="nodeNameInput" type="text" placeholder={text}></Input> 
                    </>
                    : null
                }
            </p>
        </>
    )
}

export default InlineEdit