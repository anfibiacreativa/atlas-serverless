exports = async function(name) {
    // here we are selecting the right servie, database and collection
    const data = context.services.get('mongodb-atlas').db('tattoonetwork').collection('artists');
    // and this is our aggregation pipeline
    // basically we are using the $search operator as our first stage, on the index `names`, and
    // running an autocomplete method for the field (path) `name`, with the query term `name`, 
    // which is our query input, and defining a fuzzy of max 1 edits
    // additionally we are projecting the name field and excluding the _id field
    // and limiting the results to 10
    const autocompletePayload = await data.aggregate([
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
  console.log(JSON.stringify(autocompletePayload), '>>>>>payload');
  return autocompletePayload;
};
