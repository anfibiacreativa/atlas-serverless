/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const pipe = [
    {
      '$lookup': {
        'from': 'Collection0', 
        'localField': 'fave_artist_id', 
        'foreignField': 'artist_id', 
        'as': 'combo'
      }
    }, {
      '$project': {
        '_id': 0, 
        'name': 1, 
        'combo': 1
      }
    }
  ];
  
  MongoClient.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(connectErr, client) {
      assert.equal(null, connectErr);
      const coll = client.db('').collection('');
      coll.aggregate(agg, (cmdErr, result) => {
        assert.equal(null, cmdErr);
      });
      client.close();
    });