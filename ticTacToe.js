// Question reference - https://workat.tech/machine-coding/practice/design-tic-tac-toe-smyfi9x064ry
// istanbul for code coverage

'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = "", currLine = 0;
const config = require('./config.json');

process.stdin.on('data',(chunk)=>{
    inputString+=chunk;
});

process.stdin.on('end',()=>{
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));
    main()
});

function readLine(){
    return inputString[currLine++];
}

function main() {
    const player1 = readLine().split(' ')[1];
    const player2 = readLine().split(' ')[1];
    const moves = inputString.slice(2);
    play({player1,player2,moves});
}

const board = [...Array(config.gridSize)].map(() => Array(config.gridSize).fill('-'))


const printBoard = () => board.map(e => console.log(e.join(" ")));
const play = (option) => {
    let res = "", played = false, sign = "X", validMove = true, won = false;

    printBoard();
    for(let m of option.moves){
        let co = m.split(' '); //[2,2]
        if(m === "exit"){
            if (played && !won) res = "Game Over";
            break;
        }
        played = true;
        validMove = makeMove(parseInt(co[0]),parseInt(co[1]),sign);
        if(validMove) {
            printBoard();
            if(validateBoard(sign)){
                if(sign === "X") res = `${option.player1} has won the game`
                else res = `${option.player2} has won the game`;
                won = true;
            }
            sign = (sign === "X" ? "O" : "X");
        } else {
            console.log("Invalid Move");
        }
    }
    console.log(res);
}

const makeMove = (r,c,val) => {
    console.log("-----------------------------------------");
    //because input is in 1-index format, hence making it 0-indexed.
    r--;
    c--;
    if(r < board.length && c < board[0].length && board[r][c] === "-") {
        board[r][c] = val;
        return true
    }
    return false;
}

const validateBoard = (currVal) => {
    let won = false;
    const cols = [
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]]
    ];
    const diagonal = [
        [[0,0],[1,1],[2,2]],
        [[0,2],[1,1],[2,0]]
    ];

    //row check
    for(const r of board){
        won = r.every(e => r[e] === currVal);
        if(won) return won;
    }

    //col check
    for(const c of cols){
        won = c.every(e => board[e[0]][e[1]] === currVal)
        if(won) return won;
    }

    //diagonal check
    for(const d of diagonal){
        won = d.every(e => board[e[0]][e[1]] === currVal);
        if(won) return won;
    }
    return won;
}
