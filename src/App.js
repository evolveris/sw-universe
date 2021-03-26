import './App.css';
import { useQuery, gql } from '@apollo/client';

const ALL_PLANETS = gql`
  {
    allPlanets {
      planets { 
          name
      }
    }
  }
`;

function App() {
  const { loading, data } = useQuery(ALL_PLANETS);
  if (loading) return <p>Loading...</p>;
  return data.allPlanets.planets.map(({ name }) => (
    <div key={name}>
      <p>
        {name}
      </p>
    </div>
  ));

}

export default App;
