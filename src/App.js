import './App.css';
import Store from './store/store';
import Sidebar from './components/Sidebar/Sidebar'
import ForceGraph from './components/ForceGraph/ForceGraph'

function App() {
  return(
    <Store>
      <ForceGraph></ForceGraph>
      <Sidebar></Sidebar>
    </Store>
  )

}

export default App;
