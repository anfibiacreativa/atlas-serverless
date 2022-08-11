exports = function(payload) {
    const data =  context.services.get('mongodb-atlas').db('tattoonetwork').collection('ratings');
    let id = parseInt(payload.query.id, 10);
    return data.find({_id: id}, {_id:0, ratingAvg: 1});
  };