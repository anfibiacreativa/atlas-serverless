exports = function(payload) {
    const data = context.services.get('mongodb-atlas').db('tattoonetwork').collection('artists');
    let name = payload.query.name;
    return data.aggregate([
    {
      '$search': {
        index: 'names',
        autocomplete: { 
          path: 'name',
          query: name,
          fuzzy: { maxEdits: 1 }
        }
      }
    },
    { 
      '$project': {
        name: 1,
        _id: 0
        
      } 
    }, {
      $limit: 10
    }
  ]).toArray();
  };
  