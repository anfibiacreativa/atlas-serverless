// GraphiQL Query
`query {
    allOpinionsResolver(input: 765) {
      client_name
      comment
    }
}`

// Application Query
const GetOpinions = gql`
  query GetAllOpinionsResolver($input: Int!) {
    allOpinionsResolver(input: $input) {
      client_name
      comment,
      artist_id
    }
  }
`;