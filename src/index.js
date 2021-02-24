const http = require('http');
const url = require('url');
const query = require('querystring');

// const htmlHandler = require('./htmlResponses.js');
const responses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/joke-client.html': responses.getClientResponse,
    '/random-joke': responses.getRandomJokeResponse,
    '/random-jokes': responses.getRandomJokesResponse,
    '/default-styles.css': responses.getCSSResponse,
    notFound: responses.get404Response,
  },
  HEAD: {
    '/random-joke': responses.getRandomJokeResponse,
    '/random-jokes': responses.getRandomJokesResponse,
    notFound: responses.get404Response,
  },

};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  if (urlStruct[request.method][pathname]) {
    urlStruct[request.method][pathname](request, response, params, acceptedTypes, request.method);
  } else {
    urlStruct.GET.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

// console.log(`Listening on 127.0.0.1: ${port}`);
