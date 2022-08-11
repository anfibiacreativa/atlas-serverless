exports = function(changeEvent) {
  const url = '<your-netlify-trigger-URL>';
  const postHook = context.http.post({ 
    url,
    body: { msg: 'This is in the body of a POST request!' },
    encodeBodyAsJSON: true
  })
  .then(response => { 
    const ejson_body = EJSON.parse(response.body.text());
    console.log(ejson_body + ' ' + changeEvent.documentKey._id );
  });
};
