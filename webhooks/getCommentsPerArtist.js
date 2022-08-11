exports = function(payload) {
    const data = context.services.get('mongodb-atlas').db('tattoonetwork').collection('opinions');
    let id = parseInt(payload.query.id, 10);
    return data.find({ artist_id: id });
  };