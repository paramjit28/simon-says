/**
 * DOM SELECTORS
 */

const startButton = document.querySelector(".js-start-button");
// TODO: Add the missing query selectors:
const statusSpan = document.querySelector(".js-status"); // Use querySelector() to get the status element
const heading = document.querySelector(".js-heading"); // Use querySelector() to get the heading element
const padContainer = document.querySelector(".js-pad-container"); // Use querySelector() to get the heading element

/**
 * VARIABLES
 */
let computerSequence = []; // track the computer-generated sequence of pad presses
let playerSequence = []; // track the player-generated sequence of pad presses
let maxRoundCount = 0; // the max number of rounds, varies with the chosen level
let roundCount = 0; // track the number of rounds that have been played so far

/**
 *
 * The `pads` array contains an array of pad objects.
 *
 * Each pad object contains the data related to a pad: `color`, `sound`, and `selector`.
 * - The `color` property is set to the color of the pad (e.g., "red", "blue").
 * - The `selector` property is set to the DOM selector for the pad.
 * - The `sound` property is set to an audio file using the Audio() constructor.
 *
 */

const pads = [
  {
    color: "red",
    selector: document.querySelector(".js-pad-red"),
    sound: new Audio("../assets/simon-says-sound-1.mp3"),
  },
  {
    color: "green",
    selector: document.querySelector(".js-pad-green"),
    sound: new Audio("../assets/simon-says-sound-2.mp3"),
  },
  {
    color: "blue",
    selector: document.querySelector(".js-pad-blue"),
    sound: new Audio("../assets/simon-says-sound-3.mp3"),
  },
  {
    color: "yellow",
    selector: document.querySelector(".js-pad-yellow"),
    sound: new Audio("../assets/simon-says-sound-4.mp3"),
  },
  // TODO: Add the objects for the green, blue, and yellow pads. Use object for the red pad above as an example.
];

/**
 * EVENT LISTENERS
 */

padContainer.addEventListener("click", padHandler);
// TODO: Add an event listener `startButtonHandler()` to startButton.
startButton.addEventListener("click", startButtonHandler);

/**
 * EVENT HANDLERS
 */

/**
 * Called when the start button is clicked.
 */
function startButtonHandler() {
  // TODO: Write your code here.
  const level = setLevel();
  roundCount++;

  startButton.classList.add("hidden");
  statusSpan.classList.remove("hidden");

  playComputerTurn();

  return {
    startButton: startButton,
    statusSpan: statusSpan,
  };
}

/**
 * Called when one of the pads is clicked.
 */
function padHandler(event) {
  const { color } = event.target.dataset;
  if (!color) return;

  // TODO: Write your code here.
  const pad = pads.find((pad) => pad.color === color);
  pad.sound.play();

  checkPress(color);

  return color;
}

/**
 * HELPER FUNCTIONS
 */

function setLevel(level = 1) {
  // TODO: Write your code here.
  const levelRange = [8, 14, 20, 31];
  for (let i = 1; i <= 4; i++) {
    if (level === i) {
      maxRoundCount = levelRange[i - 1];
      return maxRoundCount;
    }
  }
  return "Please enter level 1, 2, 3, or 4";
}

/**
 * Returns a randomly selected item from a given array.
 *
 */
function getRandomItem(collection) {
  if (collection.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}

/**
 * Sets the status text of a given HTML element with a given a message
 */
function setText(element, text) {
  // TODO: Write your code here.
  element.textContent = text;
  return element;
}

/**
 * Activates a pad of a given color by playing its sound and light
 */

function activatePad(color) {
  // TODO: Write your code here.
  const pad = pads.find((pad) => pad.color === color);
  pad.selector.classList.add("activated");
  pad.sound.play();

  setTimeout(() => {
    pad.selector.classList.remove("activated");
  }, 500);
}

/**
 * Activates a sequence of colors passed as an array to the function
 */

function activatePads(sequence) {
  // TODO: Write your code here.
  sequence.forEach((color, index) => {
    setTimeout(() => {
      activatePad(color);
    }, index * 600);
  });
}

/**
 * Allows the computer to play its turn.
 */
function playComputerTurn() {
  // TODO: Write your code here.
  padContainer.classList.add("unclickable");
  setText(statusSpan, "The computer's turn!!");
  setText(heading, `Round ${roundCount} of ${maxRoundCount}`);
  const randomColor = getRandomItem(["red", "green", "blue", "yellow"]);
  computerSequence.push(randomColor);

  activatePads(computerSequence);

  setTimeout(() => playHumanTurn(), roundCount * 600 + 1000); // 5
}

/**
 * Allows the player to play their turn.
 */
function playHumanTurn() {
  // TODO: Write your code here.
  padContainer.classList.remove("unclickable");
  const remainingPresses = maxRoundCount - playerSequence.length;
  setText(statusSpan, `Your turn: ${remainingPresses} presses left`);
}

/**
 * Checks the player's selection every time the player presses on a pad during
 * the player's turn
 */
function checkPress(color) {
  // TODO: Write your code here.
  playerSequence.push(color);
  const index = playerSequence.length - 1;
  const remainingPresses = computerSequence.length - playerSequence.length;
  setText(statusSpan, `Your turn ${remainingPresses} presses left`);

  if (computerSequence[index] !== playerSequence[index]) {
    resetGame("You made a mistake. Game Over!");
    return;
  }

  if (remainingPresses === 0) {
    setTimeout(() => checkRound(), 1000);
  }
}

/**
 * Checks each round to see if the player has completed all the rounds of the game * or advance to the next round if the game has not finished.
 */

function checkRound() {
  // TODO: Write your code here.
  if (playerSequence.length === maxRoundCount) {
    resetGame("Congratulations! You've won!");
  } else {
    roundCount++;
    playerSequence = [];
    setText(statusSpan, "Nice! Keep goin!");
    setTimeout(() => playComputerTurn(), 1000);
  }
}

/**
 * Resets the game. Called when either the player makes a mistake or wins the game.
 */
function resetGame(text) {
  // TODO: Write your code here.

  // Uncomment the code below:
  alert(text);
  setText(heading, "Simon Says");
  startButton.classList.remove("hidden");
  statusSpan.classList.add("hidden");
  padContainer.classList.add("unclickable");

  computerSequence = [];
  playerSequence = [];
  roundCount = 0;
}

/**
 * Please do not modify the code below.
 * Used for testing purposes.
 *
 */
window.statusSpan = statusSpan;
window.heading = heading;
window.padContainer = padContainer;
window.pads = pads;
window.computerSequence = computerSequence;
window.playerSequence = playerSequence;
window.maxRoundCount = maxRoundCount;
window.roundCount = roundCount;
window.startButtonHandler = startButtonHandler;
window.padHandler = padHandler;
window.setLevel = setLevel;
window.getRandomItem = getRandomItem;
window.setText = setText;
window.activatePad = activatePad;
window.activatePads = activatePads;
window.playComputerTurn = playComputerTurn;
window.playHumanTurn = playHumanTurn;
window.checkPress = checkPress;
window.checkRound = checkRound;
window.resetGame = resetGame;