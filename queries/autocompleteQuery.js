// GraphiQL Query
`query {
    autocompleteResolver(input: "Dan") {
        name
    }
}`

// Application Query
const GetArtists = gql`
  query GetAutocompleteResolver($name: String!) {
    autocompleteResolver(input: $name) {
      name
    }
  }
`;
