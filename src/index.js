// console.log("Random joke web service starting ...");

// 1 - pull in the HTTP server module

const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)

const url = require('url');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 5 - here's our 404 page

const errorPage = `
<html>
  <head>
    <title>404 - File not Found</title>
  </head>
  <body>
    <h1>404 - File not Found</h1>
    <p>Check your URL, or your typing!</p>
  </body>
</html>`;

// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here

const jokeArray = {
  q: [
    'What do you call a very small valentine?',
    'What did the dog say when he rubbed his tail on the sandpaper?',
    "Why don't sharks like to eat clowns?",
    'What did the fish say when be bumped his head?',
    'How many programmers does it take to change a light bulb?',
    'Whats the object-oriented way to become wealthy?',
    'Why did the programmer quit his job?',
    'Why are Assembly programmers always soaking wet?',
    'What is the most used language in programming?',
    'How did the programmer die in the shower?',
    'How do you tell HTML from HTML5?',
  ],
  a: [
    'A valen-tiny!',
    'Ruff, Ruff!',
    'Because they taste funny!',
    'Dam!',
    "None, that's a hardware problem",
    'Inheritance!',
    "Because he didn't get arrays!",
    'They work below C-level!',
    'Profanity!',
    'He read the shampoo bottle instructions: Lather. Rinse. Repeat.',
    "Try it out in Internet Explorer.  Did it work?  No?  It's HTML5!",
  ],
};

const getRandomJoke = () => {
  const num = Math.floor((Math.random() * jokeArray.q.length));
  // console.log(`Random Number: ${num}`);
  const question = jokeArray.q[num];
  const answer = jokeArray.a[num];
  const responseObj = {
    q: question,
    a: answer,
  };
  return JSON.stringify(responseObj);
};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  //  console.log("parsedUrl=", parsedUrl);
  //  console.log("pathname=", pathname);

  if (pathname === '/random-joke') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(`${getRandomJoke()}`);
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(errorPage);
    response.end();
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

// console.log(`Listening on 127.0.0.1: ${port}`);
