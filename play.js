const config = require('./config.json');

class Board{
    constructor(grid){
        this.board = [...Array(grid)].map(()=>Array(grid).fill('-'))
    }
    printBoard = () => this.board.map(e => console.log(e.join(" ")));
}

class Game{
    constructor() {
        this.newBoard = new Board(config.gridSize);
        this.board = this.newBoard.board;
        this.pieces = config.pieces;
        this.gamePlayed = false;
        this.index = 0;
    }

    setPlayers = (playersObj) => {
        this.players = {};
        const playersObjKeys = Object.keys(playersObj);
        for(let i = 0; i < playersObjKeys.length; i++) {
            this.players[this.pieces[i]] = playersObj[playersObjKeys[i]]
        }
    }

    getPlayers = () => this.players;

    getCurrentPlayerPiece = () => this.whoseTurn(this.index)

    makeMove = (move) => {
        const m = move.split(' ');
        const r = parseInt(m[0])-1;
        const c = parseInt(m[1])-1;
        if(r>this.board.length || r<0 ||
            c>this.board[0].length || c<0 ||
            this.board[r][c] !== "-") {
            console.log(`Invalid move`);
            return;
        }
        const currPlayerPiece = this.whoseTurn(this.index++)
        this.board[r][c] = currPlayerPiece
        this.newBoard.printBoard()
        if(this.checkWinner(currPlayerPiece,r,c)) {
            return `${currPlayerPiece} :: ${this.players[currPlayerPiece]} won the game`;
        }
        if(this.index>=this.pieces.length) this.index = 0;
        return;
    }

    whoseTurn = (index) => this.pieces[index];

    checkWinner = (currVal,row,col) => {
        console.log(row,col);
        let won = false;
        won = this.checkRows(currVal,row,col);
        if(won) return won;
        won = this.checkColumns(currVal,row,col)
        if(won) return won        
        if((row === col) || (row+col === config.gridSize-1)){
            won = this.checkDiagonals(currVal,row,col)
        }
        return won;
    }

    checkRows = (currVal,row,col) => {
        let count = 0;
        for(let j=0; j<config.gridSize;j++){
            if(this.board[row][j] === currVal) count++
        }
        if(count === config.gridSize) return true;
        return false;
    }

    checkColumns = (currVal,row,col) => {
        let count=0;
        for(let i=0; i<config.gridSize; i++) {
            if(this.board[i][col] === currVal) count++;
        }
        if(count === config.gridSize) return true;
        return false;
    }

    checkDiagonals = (currVal,row,col) => {
        let count = 0, m=0, n=0;
        while(m<config.gridSize && n<config.gridSize) {
            if(this.board[m][n] === currVal) count++
            m++
            n++
        }
        if(count === config.gridSize) return true;
        m = 0;
        n = 2;
        count = 0;
        while(m<config.gridSize && n>=0) {
            if(this.board[m][n] === currVal) count++
            m++
            n--
        }
        if(count === config.gridSize) return true;
        return false;
    }
}


module.exports = {
    Board,Game
}