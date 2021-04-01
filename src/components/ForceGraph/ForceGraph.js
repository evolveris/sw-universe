import { useQuery } from '@apollo/client';
import ForceGraph3D from 'react-force-graph-3d';
import { useEffect, useCallback, useRef, useContext } from 'react';
import { Context } from '../../store/store'
import { ALL_PLANETS, ALL_FILMS } from './../../graphql/queries'

const ForceGraph = () => {
  const { loading: loadingPlanets, data: planetData } = useQuery(ALL_PLANETS);
  const { loading: loadingFilms, data: filmData } = useQuery(ALL_FILMS);
 
  const [state, dispatch] = useContext(Context);

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

  const handleNodeClick = useCallback(node => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      2000  // ms transition duration
    );
    
    dispatch({type: 'SET_SHOW_SIDEBAR', payload: true})
    dispatch({type: 'SET_CURRENT_NODE', payload: {
        isPlanet: null,
        name: node.name,
        associations: []
      }
    })
  }, [fgRef]);
  
  if (loadingPlanets && loadingFilms) return <p>Loading...</p>;
  console.log("store state after focus", state);
  return(
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        backgroundColor="#2162A2"
        nodeOpacity={1}
        linkOpacity={1}
        linkWidth={1}
        onNodeClick={handleNodeClick}
      />
  )
}

export default ForceGraph;
