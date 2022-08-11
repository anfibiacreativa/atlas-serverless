exports = function(payload) {
    const data =  context.services.get('mongodb-atlas').db('tattoonetwork').collection('artists');
    const { term, facets, country } = payload.query;
    
    let searchQuery = [
      {
        $search: {
          compound: {
            should: [
              { text: { 
                    path: ['name'], 
                    query: term,
                    fuzzy: { maxEdits: 1.0 }
                  }
                 }
            ],
              must:[],
           },        
          highlight: {  path: ['styles'] }
        }},
      {
        $project: {
          name: 1, 
          _id: 0, 
          styles:1,
          joined_network: 1, 
          owns_studio:1,
          image:1,
          slug: 1,
          country: 1,
          payment_method: 1,
          artist_id: 1,
          email: 1
        }},
      { $limit: 20
     }
    ];
    
    if (facets) {
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
    
    return data.aggregate(searchQuery).toArray();
  };
  