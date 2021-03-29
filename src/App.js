import './App.css';
import { useQuery, gql } from '@apollo/client';
import ForceGraph3D from 'react-force-graph-3d';

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
  
  if (loadingPlanets || loadingFilms) return <p>Loading...</p>;

  const graphData = {
    nodes: [],
    links: []
  }

  const planetList = planetData.allPlanets.planets;
  const filmList = filmData.allFilms.films;

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

  // create tree
  for (let i = 0; i < planetList.length; i++) {
    const currPlanetFilmConnectionList = planetList[i]["filmConnection"]["films"];
      for (let j = 0; j < currPlanetFilmConnectionList.length; j++) {
        graphData["links"].push({
          source: planetList[i]["id"],
          target: currPlanetFilmConnectionList[j]["id"]
        })
      }   
  }  

  console.log(graphData);

  return(<ForceGraph3D
    graphData={graphData}
    backgroundColor="#2162A2"
    nodeOpacity={1}
    linkOpacity={1}
    linkWidth={1}
  />)

}

export default App;
