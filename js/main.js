const actions = [
  "dunk", // beats block
  "block", // beats three
  "three" // beats dunk
];
let gameCounter = 0;
let playerWins = 0;
let cpuWins = 0;

function getTrashTalk (option) {
  switch (option) {
    case actions[0]:
      return "BOOMSHAKALAKA";
    case actions[1]:
      return "Rejected!";
    case actions[2]:
      return "From downtown!";
    default:
      return "";
  }
}

function updateScore (id, score) {
  var element = document.querySelector(`[data-id="${id}"]`);
  element.innerHTML = score;
  console.log(element);
}

function calculateResult (player, cpu) {
  let result = "";
  gameCounter += 1;

  result = `<strong>Game ${gameCounter}</strong> 
            <span class="choices-played">player: ${player} vs computer: ${cpu}</span>`;

  if (player === cpu) {
    result += ` - Overtime, baby!`;

  } else 
    if (player === actions[0] && cpu === actions[1] ||
        player === actions[1] && cpu === actions[2] ||
        player === actions[2] && cpu === actions[0]) {

    result += ` - ${getTrashTalk(player)}, You win!`;
    playerWins += 1;
    updateScore('player', playerWins);
  } else 
    if (cpu === actions[0] && player === actions[1] ||
        cpu === actions[1] && player === actions[2] ||
        cpu === actions[2] && player === actions[0]) {
    
    result += ` - ${getTrashTalk(cpu)}, You lose!`;
    cpuWins += 1;
    updateScore('cpu', cpuWins);
  }

  addStreamMessage(result);
}

function generateChoice () {
  return getOption(actions);
}

function getOption (collection) {
  return collection[ Math.floor(Math.random() * collection.length) ];
}

function handleUserChoice (event) {
  const playerChoice = this.dataset.action;
  const cpuChoice = generateChoice();

  calculateResult(playerChoice, cpuChoice);
  
  event.preventDefault();
}

function addStreamMessage (message) {
  const stream = document.getElementById('activity-stream');
  const content = document.createElement('p');
  content.innerHTML = message;
  stream.prepend(content);
}

function createStream () {
  const stream = document.createElement("div");
  stream.id = "activity-stream";
  stream.classList.add('activity-stream');

  return stream;
}

function createScoreContainer (labelText) {
  const container = document.createElement("div");
  container.classList.add("score-container");

  const label = document.createElement("label");
  label.innerHTML = labelText;
  container.appendChild(label);

  const score = document.createElement("div");
  score.innerHTML = "0";
  score.classList.add("score");
  score.dataset.id = labelText.toLowerCase();
  container.appendChild(score);

  const scoreBackground = document.createElement("div");
  scoreBackground.innerHTML = "88";
  scoreBackground.classList.add("score-background");
  container.appendChild(scoreBackground);

  return container;
}

function createPlayer (id) {
  const player = document.createElement("div");
  player.id = "player-" + id;
  player.classList.add("player");

  return player;
}

function createScoreboard () {
  const scoreboard = document.createElement("div");
  scoreboard.id = "scoreboard";
  
  scoreboard.appendChild( createScoreContainer("Player") );
  scoreboard.appendChild( createScoreContainer("CPU") );

  return scoreboard;
}

function createOption (text) {
  const option = document.createElement("div");
  option.classList.add("option",text);
  option.dataset.action = text;
  option.addEventListener("click", handleUserChoice);

  return option;
}

function createOptions () {
  const options = document.createElement("div");
  options.classList.add("options");

  actions.forEach(action => {
    options.appendChild( createOption(action) );
  });

  return options;
}

function makeGame () {
  const game = document.getElementById("game");

  game.appendChild( createScoreboard() );
  game.appendChild( createOptions() );
  game.appendChild( createPlayer(1) );
  game.appendChild( createStream() );
  game.appendChild( createPlayer(2) );
}

function init() {
  makeGame();
}

window.onload = function () {
  init();
}
