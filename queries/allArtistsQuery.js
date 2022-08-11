// GraphiQL Query
`query {
    allArtistsResolver(input: {term: "Daniel"}) {
      name
      styles
    }
}`

// Application Query
const GetArtists = gql`
  query GetAllArtistsResolver($allArtistsInput: AllArtistsInput!) {
    allArtistsResolver(input: $allArtistsInput) {
      name
      image
      joined_network
      styles
      country
      slug
    }
  }
`;

// Application Query for single artist
const GetArtistBySlug = gql`
  query artist($artistQueryInput: ArtistQueryInput!) {
    artist(query: $artistQueryInput) {
      name
      image
      joined_network
      styles
      slug
      country
      email
      payment_method
      artist_id {
        artist_id
      }
    }
  }
`;