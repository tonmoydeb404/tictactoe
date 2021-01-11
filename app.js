//SELECTING ELEMENT FROM HTML
var switchIcn, board, box;
switchIcn = document.querySelector('.switch');
board = document.querySelector('.board');
box = document.querySelectorAll('.box');

var msg, msgTxt, msgBtn;
msg = document.querySelector('.msg');
msgTxt = document.querySelector('.msg-txt');
msgBtn = document.querySelector('.msg-btn');
//STORING USABLE CONDITIONS AND DATA
var matchCombine = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
  ];
var playWithComputer = false;
var turn = true;
var x = 'x';
var o = 'o';

//STARTING AND RESETING FUNCTION
function startGame() {
    //    IT WILL EXCUTE IF USER WANTS TO PLAY WITH COMPUTER
    if (playWithComputer) {
        box.forEach(cell => {
            //DELETING ALL PREVIOUS CLASS FROM ALL CELL
            cell.classList.remove(x);
            cell.classList.remove(o);
            cell.removeEventListener('click', customPlayers); //REMOVING CUSTOM PLAYER FUNCTION FROM ALL CELL
            cell.addEventListener('click', player); //ADDING PLAYER FUNCTION IN ALL CELL
        })
        if (!turn) {
            computer();
        }
    } else {
        box.forEach(cell => {
            //DELETING ALL PREVIOUS CLASS FROM ALL CELL
            cell.classList.remove(x);
            cell.classList.remove(o);
            cell.removeEventListener('click', player); //REMOVING PLAYER FUNCTION FROM ALL CELL
            cell.addEventListener('click', customPlayers, {
                once: true
            }); //ADDING CUSTOM PLAYER FUNCTION IN ALL CELL AND IT WILL EXCUTE ONCE
        })
    }
    update()
    msgBox()
}

//CHANGING MODE AND THE THEME COLOR OF WEBSITE
function changeMode() {
    if (switchIcn.classList.contains('bot')) {
        switchIcn.classList.remove('bot');
        switchIcn.classList.add('custom');
        switchIcn.innerHTML = '<i class="fas fa-user" ></i>';
        document.documentElement.style.setProperty('--color', '#37f')
        playWithComputer = false;
    } else {

        switchIcn.classList.add('bot');
        switchIcn.classList.remove('custom');
        switchIcn.innerHTML = '<i class="fas fa-robot" ></i>';
        document.documentElement.style.setProperty('--color', '#ff2525')
        playWithComputer = true;
    }

    //RESTEING GAME AND MAKING MSG BOX VISIBLE FOR ONCE CAUSE WHEN GAME WAS RESET THE MSG BOX WILL AUTOMATICLLY INVISIBLE
    msgBox()
    startGame()
}

function player(e) {
    //    CHECKING THE TURN FOR PLAYER
    if (turn) {
        var item = e.target;
        if ((!item.classList.contains(o)) && (!item.classList.contains(x))) {
            item.classList.add(x);
            // CHECKING X FOR WINNING OR DRAW
            check(x)
            // UPADTING TURN
            turn = false;
            update()
            setTimeout(computer, 500);
        }
    }
}


function computer() {
    if (isDraw() || checkWinner(x)) {
        return;
    } else if (!turn) {
        var autoIndex = Math.floor(Math.random() * box.length);
        if ((!box[autoIndex].classList.contains(x)) && (!box[autoIndex].classList.contains(o))) {
            box[autoIndex].classList.add(o);
            // CHECKING O FOR WINNING OR DRAW
            check(o);
            // UPADTING TURN
            turn = true;
            update()
        } else {
            computer()
        }
    }
}


function customPlayers(e) {
    if (!playWithComputer) {
        let item = e.target;
        var mark = (turn) ? x : o;
        item.classList.add(mark);
        // CHECKING FOR WINNING OR DRAW
        check(mark)
        // UPADTING TURN
        turn = (turn) ? false : true;
        update()
    }
}

function check(who) {
    if (checkWinner(who)) {
        msgTxt.innerHTML = who + ' Wins';
        msgBox()
    } else if (isDraw()) {
        msgTxt.innerHTML = 'Draw';
        msgBox()
    }
}

function checkWinner(who) {
    // CHECKING FOR X OR O CLASS THAT AR THEY IN THE WHENING CONDITION INDEX
    return matchCombine.some(cond => {
        return cond.every(index => {
            return box[index].classList.contains(who);
        });
    });
}

function isDraw() {
    // CHECKING THAT IS ALL CELL ARE HAVE X OR O CLASS
    return [...box].every(place => {
        return place.classList.contains(x) || place.classList.contains(o);
    })
}

function msgBox() {
    if (msg.classList.contains('show')) {
        msg.classList.remove('show');
    } else {
        msg.classList.add('show');
    }
}

function update() {
    var turnbtn = document.querySelector('.btn');
    if (turn) {
        turnbtn.innerHTML = x + "'S TURN";
    } else {
        turnbtn.innerHTML = o + "'S TURN";
    }
}
