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

const getRandomJoke = () => {
  const random = Math.floor((Math.random() * jokeArray.length));
  return JSON.stringify(jokeArray[random]);
};

const getRandomJokes = (limit = 1) => {  
  const responseObj = [];
  
  if (limit > 0 && limit < jokeArray.length) {
    let shuffledJokes = _.shuffle(jokeArray);
    for (let i = 0; i < limit; i++) {
      responseObj[responseObj.length] = shuffledJokes[i];
    }
  }
  return JSON.stringify(responseObj);
};


const getRandomJokeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(`${getRandomJoke()}`);
  response.end();
};

const getRandomJokesResponse = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(getRandomJokes(params.limit));
  response.end();
}

module.exports = {
  getRandomJokeResponse,
  getRandomJokesResponse,
}
