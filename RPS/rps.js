let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const ri = Math.floor(Math.random() * 3);
  return options[ri];
};

const drawGame = () => {
  msg.innerText = "Ohh! it's a DRAW";
  msg.style.backgroundColor = "purple";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You got it champion! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `Better luck next time ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
    
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      
      userWin = compChoice === "scissors" ? false : true;
    } else {
      
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});