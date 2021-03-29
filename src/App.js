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

  const planetList = planetData?.allPlanets.planets;
  const filmList = filmData?.allFilms.films;

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
  // const filmPlanets = planetList.filter((obj) => obj["filmConnection"]["films"].length !== 0)

  for (let i = 0; i < filmlessPlanets.length; i++) {
    for (let j = 0; j < filmlessPlanets.length; j++) {
      graphData["links"].push({
        source: filmlessPlanets[i]["id"],
        target: filmlessPlanets[j]["id"]
      })
    }

    // graphData["links"].push({
    //   source: filmlessPlanets[i]["id"],
    //   target: filmlessPlanets[j]["id"]
    // })
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
