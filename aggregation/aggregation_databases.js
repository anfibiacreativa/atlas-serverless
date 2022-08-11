const agg = [
    {
      '$lookup': {
        'from': 'opinions', 
        'localField': 'artist_id', 
        'foreignField': 'artist_id', 
        'as': 'comments'
      }
    }, {
      '$unwind': {
        'path': '$comments'
      }
    }, {
      '$group': {
        '_id': '$artist_id', 
        'ratingSum': {
          '$sum': '$comments.rating'
        }, 
        'ratingAvg': {
          '$avg': '$comments.rating'
        }
      }
    }, {
      '$out': 'ratings'
    }
  ];