import { EditableText, Input } from './InlineEdit.styled'
import { Context } from './../../store/store'
import { useContext, useState } from 'react';
import useOnClickOutside from './../../hooks/useOnClickOutside'
import { useRef, useCallback } from 'react';

const InlineEdit = ({ text }) => {
    const [state, dispatch] = useContext(Context);
    const [showInput, setShowInput] = useState(false);
    const [showText, setShowText] = useState(true);
    const [newCurrentNodeName, setNewCurrentNodeName] = useState(null);
    const wrapperRef = useRef(null);

    // check to see if the user clicked outside of this component
    useOnClickOutside(wrapperRef, () => {
        if (showInput) {
            setNewCurrentNodeName(newCurrentNodeName);
            setShowInput(false);
            setShowText(true);
        }
    });

    const handleInputChange = useCallback(
        event => {
          setNewCurrentNodeName(event.target.value);
        },
        [setNewCurrentNodeName]
      );

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
                    <span ref={wrapperRef}>
                        <label htmlFor="nodeNameInput">Edit node</label> 
                        <Input onChange={handleInputChange} id="nodeNameInput" type="text" placeholder={text}></Input> 
                    </span>
                    : null
                }
            </p>
        </>
    )
}

export default InlineEdit