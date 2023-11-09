const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;


const items = [
{name: "nike", image: "nike2.png"},
{name: "instagram", image: "instagram2.png"},
{name: "burgerking", image: "burger-king.png"},
{name: "amazon", image: "amazon3.png"},
{name: "spotify", image: "spotify2.png"},
{name: "twitter", image: "twitter2.png"},
{name: "mcdonalds", image: "mcdonalds2.png"},
{name: "youtube", image: "youtube2.png"}
]


//Initial Time
let seconds = 0,
  minutes = 0;


//For timer
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
/* seconds = 0;
    alert("Game Over!") */
    result.innerHTML = `<h2>You Lose</h2>`
   
     stopGame();
    
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};


//Pick random objects from the items array
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};


const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }

  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
             if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>`
              
              stopGame();
            }
          } else {
            //if the cards dont match
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};


//Start game
startButton.addEventListener("click", () => {
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timeGenerator, 1000);
  initializer();
});

//Restart game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    document.getElementById("h1");
    clearInterval(interval);
  })
);


const initializer = () => {
  result.innerText = "";
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};










/*     for (let i = 0; i < size; i++){

        let j  = Math.floor(Math.random()* tempArray.length)
        [size[i], size[j]] = [size[j], size[i]];

        cardValues.push(tempArray[j])
        tempArray.splice(j, 1)
    }
    return cardValues
    */


        // Fitcher-Iets don't yberen v etom
/*     for (let i = size.length - 1 ; i > 0 ; i--){

        let j = Math.round(Math.random() * (i));
        [size[i], size[j]] = [size[j], size[i]];

        cardValues.push(tempArray[j])
        tempArray.splice(j, 1)
    }   */  