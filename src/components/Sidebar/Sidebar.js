import StyledSidebar from './Sidebar.styled';
import { Context } from './../../store/store'
import { useContext } from 'react';

function Sidebar () {
    const [state, dispatch] = useContext(Context);
    return (
      <>
      {state.showSidebar ? <StyledSidebar /> : null}
      </>
    );
}
  
export default Sidebar;