const _ = require('underscore');

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

const getRandomJokeResponse = (request, response, params, acceptedTypes) => {
  if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.write(`${getRandomJoke('text/xml')}`);
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(`${getRandomJoke('application/json')}`);
  }
  response.end();
};

const getRandomJokesResponse = (request, response, params, acceptedTypes) => {
  if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.write(getRandomJokes(params.limit, 'text/xml'));
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomJokes(params.limit, 'application/json'));
  }

  response.end();
};

module.exports = {
  getRandomJokeResponse,
  getRandomJokesResponse,
};
