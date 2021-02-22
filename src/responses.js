const _ = require('underscore');
const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const defaultStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const jokeArray = [
  {
    q: 'What do you call a very small valentine?',
    a: 'A valen-tiny!',
  },
  {
    q: 'What did the dog say when he rubbed his tail on the sandpaper?',
    a: 'Ruff, Ruff!',
  },
  {
    q: "Why don't sharks like to eat clowns?",
    a: 'Because they taste funny!',
  },
  {
    q: 'What did the fish say when be bumped his head?',
    a: 'Dam!',
  },
  {
    q: 'How many programmers does it take to change a light bulb?',
    a: "None, that's a hardware problem",
  },
  {
    q: 'Whats the object-oriented way to become wealthy?',
    a: 'Inheritance!',
  },
  {
    q: 'Why did the programmer quit his job?',
    a: "Because he didn't get arrays!",
  },
  {
    q: 'Why are Assembly programmers always soaking wet?',
    a: 'They work below C-level!',
  },
  {
    q: 'What is the most used language in programming?',
    a: 'Profanity!',
  },
  {
    q: 'How did the programmer die in the shower?',
    a: 'He read the shampoo bottle instructions: Lather. Rinse. Repeat.',
  },
  {
    q: 'How do you tell HTML from HTML5?',
    a: "Try it out in Internet Explorer.  Did it work?  No?  It's HTML5!",
  },

];

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomJoke = (responseType) => {
  const random = Math.floor((Math.random() * jokeArray.length));
  if (responseType === 'text/xml') {
    const { q } = jokeArray[random];
    const { a } = jokeArray[random];

    const responseXML = `
    <?xml verson="1.0" ?>
    <joke>
      <q>${q}</q>
      <a>${a}</a>
    </joke>
  `;
    return responseXML;
  }
  return JSON.stringify(jokeArray[random]);
};

// const getRandomJokeXML = () => {
//   const random = Math.floor((Math.random() * jokeArray.length));
//
//
// };

const getRandomJokes = (limit = 1, responseType) => {
  const responseObj = [];
  let responseXML = `
  <?xml verson="1.0" ?>
  <jokes>
  `;
  if (limit > 0 && limit < jokeArray.length) {
    const shuffledJokes = _.shuffle(jokeArray);
    for (let i = 0; i < limit; i += 1) {
      responseObj[responseObj.length] = shuffledJokes[i];
      responseXML += `
      <joke>
        <q>${shuffledJokes[i].q}</q>
        <a>${shuffledJokes[i].a}</a>
      </joke>
      `;
    }
  }
  responseXML += '</jokes>';

  if (responseType === 'text/xml') {
    return responseXML;
  }
  return JSON.stringify(responseObj);
};

const getRandomJokeResponse = (request, response, params, acceptedTypes, httpMethod) => {
  if (httpMethod === 'GET') {
    if (acceptedTypes.includes('text/xml')) {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(`${getRandomJoke('text/xml')}`);
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(`${getRandomJoke('application/json')}`);
    }
  } else if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': `${getBinarySize(getRandomJoke(params.limit, 'text/xml'))}` });
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': `${getBinarySize(getRandomJoke(params.limit, 'text/xml'))}` });
  }

  response.end();
};

const getRandomJokesResponse = (request, response, params, acceptedTypes, httpMethod) => {
  if (httpMethod === 'GET') {
    if (acceptedTypes.includes('text/xml')) {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getRandomJokes(params.limit, 'text/xml'));
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(getRandomJokes(params.limit, 'application/json'));
    }
  } else if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': `${getBinarySize(getRandomJokes(params.limit, 'text/xml'))}` });
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': `${getBinarySize(getRandomJokes(params.limit, 'application/json'))}` });
  }

  // if (acceptedTypes.includes('text/xml')) {
  //   response.writeHead(200, { 'Content-Type': 'text/xml' });
  //   response.write(getRandomJokes(params.limit, 'text/xml'));
  // } else {
  //   response.writeHead(200, { 'Content-Type': 'application/json' });
  //   response.write(getRandomJokes(params.limit, 'application/json'));
  // }
  response.end();
};

// Moved from htmlResponses.js
const get404Response = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(defaultStyles);
  response.end();
};

module.exports = {
  getRandomJokeResponse,
  getRandomJokesResponse,
  get404Response,
  getCSSResponse,
};
