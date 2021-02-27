'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = "", currLine = 0;
const Play = require('./play');
console.log(" ======= Enter players name ======= ");
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
    const player1 = readLine();
    const player2 = readLine();
    const moves = inputString.slice(2);
    const game = new Play.Game();
    game.setPlayers(player1,player2);
    const res =  game.makeMoves(moves);
    console.log(res);
}