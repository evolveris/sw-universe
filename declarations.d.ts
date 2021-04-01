interface StarWarsGraphNode {
    isPlanet?: string;
    name: string,
    associations: object[]
}

interface StarWarsGlobalState {
    currentNode: StarWarsGraphNode
}

// declare function UseContext(context: any): [StarWarsGlobalState, function];