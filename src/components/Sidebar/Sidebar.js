import StyledSidebar from './Sidebar.styled';

function Sidebar ({ showSidebar }) {
    return (
      <>
      {showSidebar ? <StyledSidebar /> : null}
      </>
    );
}
  
export default Sidebar;