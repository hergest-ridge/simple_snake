let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 101; i++) {
  let singleCell = document.createElement('div');
  field.appendChild(singleCell);
  singleCell.classList.add('singleCell');
}

let singleCell = document.getElementsByClassName('singleCell');
let x = 1,
  y = 10;

for (let i = 0; i < singleCell.length; i++) {
  if (x > 10) {
    x = 1;
    y--;
  }
  singleCell[i].setAttribute('posx', x);
  singleCell[i].setAttribute('posy', y);
  x++;
}

function generateSnakeHead() {
  let posX = Math.round(Math.random() * (10 - 3) + 3); //1-10
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

let snakeHead = generateSnakeHead();
let snakeBody = [
  getCoordSelector(snakeHead[0], snakeHead[1]),
  getCoordSelector(snakeHead[0] - 1, snakeHead[1]),
  getCoordSelector(snakeHead[0] - 2, snakeHead[1])
]

snakeBody[0].classList.add('snakeHead');
for (let i = 0; i < snakeBody.length; i++) {
  snakeBody[i].classList.add('snakeBody');
}

console.log(snakeBody);
let target;

function createTarget() {
  function generateTargetCoords() {
    let posX = Math.round(Math.random() * (10 - 1) + 1); //1-10
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }

  let targetCoords = generateTargetCoords();
  console.log(targetCoords);
  target = getCoordSelector(targetCoords[0], targetCoords[1]);

  while (target.classList.contains('snakeBody')) {
    let targetCoords = generateTargetCoords();
    target = getCoordSelector(targetCoords[0], targetCoords[1]);
  }

  target.classList.add('target');
}

createTarget();

let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
width: 400px;
margin: auto;
font-family: "Helvetica";
margin-top: 40px;
font-size: 30px;
display: block;
`;
let score = 0;
input.readOnly = true;
input.value = `Счет: ${score}`;


function getCoordSelector(x, y) {
  let queryString = '[posX = "' + x + '"][posY ="' + y + '"]';
  return document.querySelector(queryString);
}


function move() {
  let snakeHeadCoords = [parseInt(snakeBody[0].getAttribute('posX')), parseInt(snakeBody[0].getAttribute('posY'))];
  snakeBody[0].classList.remove('snakeHead');
  snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
  snakeBody.pop();


  switch (direction) {
    case 'right': {
      if (snakeHeadCoords[0] < 10) {

        snakeBody.unshift(getCoordSelector(snakeHeadCoords[0] + 1, snakeHeadCoords[1]));
      } else {
        snakeBody.unshift(getCoordSelector(1, snakeHeadCoords[1]));
      }
    }
      break;
    case 'left': {
      if (snakeHeadCoords[0] > 1) {
        snakeBody.unshift(getCoordSelector(snakeHeadCoords[0] - 1, snakeHeadCoords[1]));
      } else {
        snakeBody.unshift(getCoordSelector(10, snakeHeadCoords[1]));
      }
    }
      break;
    case 'up': {
      if (snakeHeadCoords[1] < 10) {
        snakeBody.unshift(getCoordSelector(snakeHeadCoords[0], snakeHeadCoords[1] + 1));
      } else {
        snakeBody.unshift(getCoordSelector(snakeHeadCoords[0], 1));
      }
    }
      break;
    case 'down': {
      if (snakeHeadCoords[1] > 1) {
        snakeBody.unshift(getCoordSelector(snakeHeadCoords[0], snakeHeadCoords[1] - 1));
      } else {
        snakeBody.unshift(getCoordSelector(snakeHeadCoords[0], 10));
      }
    }
      break;
  }


  if (snakeBody[0].getAttribute('posX') === target.getAttribute('posX') && snakeBody[0].getAttribute('posY') === target.getAttribute('posY')) {
    target.classList.remove('target');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(getCoordSelector(a, b));
    score+=10;
    input.value = `Счет: ${score}`;
    createTarget();
  }

  if (snakeBody[0].classList.contains('snakeBody')) {
    // snakeBody[0].style.background = 'url(img/dead.jpg) center no-repeat';
    // snakeBody[0].style.backgroundSize = 'cover';
    for (let i = 0; i < snakeBody.length; i++) {
      snakeBody[i].style.background = 'url(img/dead.jpg) center no-repeat';
      snakeBody[i].style.backgroundSize = 'cover';
    }
    setTimeout(() => {
      input.value = `Игра окончена! Счет: ${score}`;
    }, 200);

    clearInterval(interval);

  }
  snakeBody[0].classList.add('snakeHead');

  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
  }
  steps = true;
}

let interval = setInterval(move, 300);

window.addEventListener('keydown', e => {
  if(!steps) return;
  if ('ArrowLeft' === e.key && direction !== 'right') {
    direction = 'left';
    console.log('ArrowLeft');
    steps = false;
  }
  if ('ArrowRight' === e.key && direction !== 'left') {
    direction = 'right';
    console.log('ArrowRight');
    steps = false;
  }
  if ('ArrowUp' === e.key && direction !== 'down') {
    direction = 'up';
    console.log('ArrowUp');
    steps = false;
  }
  if ('ArrowDown' === e.key && direction !== 'up') {
    direction = 'down';
    console.log('ArrowDown');
    steps = false;

  }
}, false);
