import './App.css';
import { useQuery, gql } from '@apollo/client';
import ForceGraph3D from 'react-force-graph-3d';
import { useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar/Sidebar'

const ALL_PLANETS = gql`
{
  allPlanets {
    planets { 
        name
      	id
        diameter
      	filmConnection {
      	  films {
      	    id
            title
      	  }
      	}
    }
  }
}
`;

const ALL_FILMS = gql`
{
  allFilms {
    films {
     title
     id
     planetConnection {
       planets {
         name
         id
       }
     }
   }
  }
 }
`

function App() {

  const { loading: loadingPlanets, data: planetData } = useQuery(ALL_PLANETS);
  const { loading: loadingFilms, data: filmData } = useQuery(ALL_FILMS);

  const graphData = {
    nodes: [],
    links: []
  }

  useEffect(() => {
    
  const planetList = planetData?.allPlanets.planets;
  const filmList = filmData?.allFilms.films;
  
  if (planetList && filmList) {
    // populate with unique planets
    for (let i = 0; i < planetList.length; i++) {
      graphData["nodes"].push({
        id: planetList[i]["id"],
        name: planetList[i]["name"],
        val: planetList[i]["diameter"] ? planetList[i]["diameter"] /1000 : 1
      })
    }

    // populate with unique films
    for (let i = 0; i < filmList.length; i++) {
      graphData["nodes"].push({
        id: filmList[i]["id"],
        name: filmList[i]["title"],
        val: 5
      })
    }

    const filmlessPlanets = planetList.filter((obj) => obj["filmConnection"]["films"].length === 0);

    for (let i = 0; i < filmlessPlanets.length - 1; i++) {
      if (i === filmlessPlanets.length - 2) {
        graphData["links"].push({
          source: filmlessPlanets[0]["id"],
          target: filmlessPlanets[filmlessPlanets.length - 2]["id"]
        })
      } else {
        graphData["links"].push({
          source: filmlessPlanets[i]["id"],
          target: filmlessPlanets[i+1]["id"]
        })
      }
    }

    // create tree with associations
    for (let i = 0; i < planetList.length; i++) {
      const filmPlanets = planetList[i]["filmConnection"]["films"];
        if (filmPlanets.length > 0) {
          for (let j = 0; j < filmPlanets.length; j++) {
            graphData["links"].push({
              source: planetList[i]["id"],
              target: filmPlanets[j]["id"]
            })
          } 
        }
    }
  }
    
  }, [loadingFilms, loadingPlanets, filmData, planetData, graphData]);

  const fgRef = useRef();

  const handleClick = useCallback(node => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      2000  // ms transition duration
    );

  }, [fgRef]);
  
  if (loadingPlanets && loadingFilms) return <p>Loading...</p>;

  return(
    <>
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        backgroundColor="#2162A2"
        nodeOpacity={1}
        linkOpacity={1}
        linkWidth={1}
        onNodeClick={handleClick}
      />
      <Sidebar></Sidebar>
    </>
  )

}

export default App;
