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
        this.newBoard.printBoard();
        this.pieces = config.pieces;
        this.gamePlayed = false;
        this.result = `Game Over`;
    }

    setPlayers = (p1,p2) => {
        this.players = {
            [this.pieces[0]]:p1,
            [this.pieces[1]]:p2,
        }
    }

    getPlayers = () => {
        return this.players;
    }

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

    whoseTurn = (index) => {
        return this.pieces[index];
    }

    checkWinner = (currVal) => {
        let won = false;
        //row check
        for(const r of this.board){
            won = r.every(e => r[e] === currVal);
            if(won) return won;
        }
        won = this.checkColumns(currVal)
        if(won) return won
        won = this.checkDiagonals(currVal)
        return won;
    }

    checkColumns = (currVal) => {
        let j=0;
        while(j<config.gridSize){
            let i = 0,count=0;
            while(i<config.gridSize) {
                if(this.board[i][j] === currVal) count++;
                i++
            }
            if(count === config.gridSize){
                return true
            }
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
        if(count === config.gridSize) {
            return true;
        }
        m = 0;
        n = 2;
        count = 0;
        while(m<config.gridSize && n>=0) {
            if(this.board[m][n] === currVal) count++
            m++
            n--
        }
        if(count === config.gridSize) {
            return true
        }
        return false;
    }
}


module.exports = {
    Board,Game
}