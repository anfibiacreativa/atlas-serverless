exports = (input) => {
    const data = context.services.get('mongodb-atlas').db('tattoonetwork').collection('opinions');
    console.log(input, 'input');
    const commentsQuery = [
      {
        '$search': { 
          index: 'opinions',
          near: { 
            path: 'artist_id', 
            origin: input,
            pivot: 1
          }
        }
      },
      { 
        '$project': {
          comment: 1,
          client_name: 1,
          rating: 1,
          _id: 0
          
        } 
      }, {
        $limit: 10
      }
    ];
    return data.aggregate(commentsQuery).toArray();
  };
  