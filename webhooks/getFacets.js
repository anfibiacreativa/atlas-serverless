exports = function(payload) {
    const data =  context.services.get('mongodb-atlas').db('tattoonetwork').collection('artists');
    let facet = payload.query.facet;
    return data.distinct(facet);
  };
  