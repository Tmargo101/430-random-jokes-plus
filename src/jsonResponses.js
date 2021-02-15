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

const getRandomJokeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(`${getRandomJoke()}`);
  response.end();
};

module.exports = {
  getRandomJokeResponse,
}
