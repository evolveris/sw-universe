import { Text, Input } from './InlineEdit.styled'
import { Context } from './../../store/store'
import { useContext } from 'react';

const InlineEdit = () => {
    const [state, dispatch] = useContext(Context);

    const handleInputChange = (e) => {
        console.log(e.target.value);
    }

    return(
        <>
            <Text>
                <Text>{state.currentNode}</Text>
                <Input onChange={handleInputChange}></Input>
            </Text>
        </>
    )
}

export default InlineEdit