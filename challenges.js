var scores, roundScore, activePlayer, lastDice, dice, gamePlaying, previousScoreOne, previousScoreTwo, scoreLimit;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var dice = dice1 + dice2;
        var diceDOM = document.querySelector('.dice0');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice1 + '.png';
        var diceDOM1 = document.querySelector('.dice1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice2 + '.png';
        if (dice === 6 && lastDice === 6) {
            // player looses his score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textCOntent = '0';
        } else if (dice !== 2) {
            previousScoreOne = dice1;
            previousScoreTwo = dice2;

            if (previousScoreOne === 6 && previousScoreTwo === 6) {
                scores[activePlayer] = 0;
            }
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        lastDice = dice;
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // adding current score to global score
        scores[activePlayer] += roundScore;
        // updating UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];



        scoreLimit = document.querySelector("#inputRecord").value;
        console.log(scoreLimit);
        // checking if any player won a game

        if (scores[activePlayer] >= scoreLimit) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice0').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice0').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    previousScoreOne = 0;
    previousScoreTwo = 0;

    document.querySelector('.dice0').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}