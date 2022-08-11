exports = async function(input) {
  const data =  context.services.get('mongodb-atlas').db('tattoonetwork').collection('artists');
  const { term, facets, country } = input;
  
  let searchQuery = [
    {
      $search: {
        compound: {
            should: [],
            must:[],
         },        
        highlight: { path: ['name'] }
      }},
    {
      $project: {
        _id: 0,
        name: 1, 
        styles:1,
        joined_network: 1, 
        owns_studio:1,
        image:1,
        slug: 1,
        country: 1,
        payment_method: 1,
        artist_id: 1,
        email: 1,
        score: { $meta: 'searchScore' },
        highlights: { $meta: 'searchHighlights' }
      }},
    { $limit: 20
   }
  ];
  
  if(term) {
    let termStage = { 
      text: { 
          path: ['name'], 
          query: term,
          fuzzy: { maxEdits: 1.0 }
    }};
    searchQuery[0].$search.compound.should.push(termStage);
  }
  
  if (facets && facets.length >= 1) {
    let stylesStage = {
      text: {
          query: facets,
          path: 'styles'
    }};
    console.log(searchQuery);
    searchQuery[0].$search.compound.must.push(stylesStage);
  }
  
  if (country) {
     let countryStage = {
      text: {
          query: country,
          path: 'country'
    }};
    searchQuery[0].$search.compound.must.push(countryStage);
  }
  const searchQueryPayload = await data.aggregate(searchQuery).toArray();
  console.log(JSON.stringify(searchQueryPayload), '>>>>>payload');
  return searchQueryPayload;
};