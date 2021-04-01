import { gql } from '@apollo/client';

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

export { ALL_PLANETS, ALL_FILMS }