'use strict';
const Play = require('./play');
const inquirer = require('inquirer');
const config = require('./config.json');
console.log(" ======= Enter players name ======= ");
const askPlayersName = config.pieces.map((p,i)=>{
    return {
        type:'input',
        message: `player ${i+1} name :-`,
        name:`player${i+1}`
    }
});


async function main() {
    const game = new Play.Game();
    const names = await inquirer.prompt(askPlayersName);
    game.setPlayers(names);
    const playerName = game.getPlayers()
    game.result = 'Game Over';
    for(let i=0; i<config.gridSize**2;i++){
        const currentPlayerPiece = game.getCurrentPlayerPiece()
        const move = await inquirer.prompt([{
            type:'input',
            name:'play',
            message:` ----- ${currentPlayerPiece} turn :: enter your move ${playerName[currentPlayerPiece]} -----`
        }])
        const res = game.makeMove(move.play);
        if(res) {
            game.result = res;
            break;
        }
    }
    console.log(game.result);
    process.exit();
}
main();