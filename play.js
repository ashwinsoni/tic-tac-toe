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

    /** this function is not being used now*/
    makeMoves = (moves) => {
        let index = 0;
        for(const m of moves) {
            console.log("------------------------------------------------------")
            const move = m.split(' ');
            const r = parseInt(move[0])-1
            const c = parseInt(move[1])-1;
            if(r>this.board.length || r<0 ||
                c>this.board[0].length || c<0 ||
                this.board[r][c] !== "-") {
                console.log(`Invalid move`);
                continue;
            }
            const currPlayer = this.whoseTurn(index++)
            this.board[r][c] = currPlayer
            this.newBoard.printBoard()
            if(this.checkWinner(currPlayer)) {
                this.result = `${this.players[currPlayer]} won the game`;
                break;
            }
            if(index>=this.pieces.length) index = 0;
        }
        return this.result;
    }

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
        const currPlayer = this.whoseTurn(this.index++)
        this.board[r][c] = currPlayer
        this.newBoard.printBoard()
        if(this.checkWinner(currPlayer)) {
            return `${this.players[currPlayer]} won the game`;
        }
        if(this.index>=this.pieces.length) this.index = 0;
        return;
    }

    whoseTurn = (index) => this.pieces[index];

    checkWinner = (currVal) => {
        let won = false;
        won = this.checkRows(currVal);
        if(won) return won;
        won = this.checkColumns(currVal)
        if(won) return won
        won = this.checkDiagonals(currVal)
        return won;
    }

    checkRows = (currVal) => {
        for(let i=0; i<config.gridSize; i++) {
            let count = 0;
            for(let j=0; j<config.gridSize; j++) {
                if(this.board[i][j] === currVal) count++
            }
            if(count === config.gridSize) return true;
        }
    }

    checkColumns = (currVal) => {
        let j=0;
        while(j<config.gridSize){
            let i = 0,count=0;
            while(i<config.gridSize) {
                if(this.board[i][j] === currVal) count++;
                i++
            }
            if(count === config.gridSize) return true;
            j++
        }
        return false;
    }

    checkDiagonals = (currVal) => {
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