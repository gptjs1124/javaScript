'use strict';

let dice = document.querySelector('.dice'); //주사위
let btnRoll = document.querySelector('.btn--roll');
let playerActive = document.querySelector('.player--active');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
let nowPlayer = current0;
let btnNewGame = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
dice.style.display = 'none';

//Reset
btnNewGame.addEventListener('click', function () {
  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';
  dice.style.display = 'none';
});

// RollDice 클릭시 버튼 노출
btnRoll.addEventListener('click', function () {
  dice.style.display = 'block';

  //주사위 랜덤 돌리기
  diceRandom();
});

// 주사위 넘버 가져오기
let diceGetNumber = function () {
  let diceSrc = dice.src;
  let diceSplit = diceSrc.split('/');
  let diceLastLength = diceSplit[diceSplit.length - 1];
  let diceimg = diceLastLength.split('.');
  let diceName = diceimg[0];
  let diceNames = diceName.split('-');
  let diceNm = diceNames[1];
  return diceNm;
};

// 주사위 랜덤 돌리기
let diceRandom = function () {
  let random = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${random}.png`;

  if (random == 1) {
    if (nowPlayer == current0) {
      current0.textContent = '0';
    } else {
      current1.textContent = '0';
    }
    changePlayer();
  } else {
    nowPlayer.textContent =
      Number(nowPlayer.textContent) + Number(diceGetNumber());
  }
};

// 주사위 숫자가 1일 경우 다른 player로 전환
let changePlayer = function () {
  if (nowPlayer == current0) {
    nowPlayer = current1;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    //player0.classList.remove('player--active');
    //player1.classList.add('player--active');
  } else {
    nowPlayer = current0;
    player1.classList.toggle('player--active');
    player0.classList.toggle('player--active');
  }
};

//hold 클릭했을 경우
btnHold.addEventListener('click', function () {
  if (nowPlayer == current0) {
    score0.textContent = current0.textContent;
    current0.textContent = '0';
  } else {
    score1.textContent = current1.textContent;
    current1.textContent = '0';
  }

  //이긴 사람 체크
  let ckWinnerPlayer = playerActive.querySelector('.score').textContent;
  if (ckWinnerPlayer > 10) {
    playerActive.classList.toggle('player--winner');
    playerActive.classList.toggle('player--active');
  } else {
    changePlayer();
  }
});
