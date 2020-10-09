import { Column } from "./column.js";
import { ColumnWinInspector } from './column-win-inspector.js';
import { RowWinInspector } from './row-win-inspector.js';
import { DiagonalWinInspector } from './diagonal-win-inspector.js';


class Game {
    constructor(playerOneName, playerTwoName) {
        this.playerOneName = playerOneName.toUpperCase();
        this.playerTwoName = playerTwoName.toUpperCase();
        this.currentPlayer = 1;
        this.columns = [
          new Column(),
          new Column(),
          new Column(),
          new Column(),
          new Column(),
          new Column(),
          new Column()
        ],
        this.winnerNumber = 0;
    }
    getName() {
        if (this.winnerNumber === 3) {
            return `${this.playerOneName} ties with ${this.playerTwoName}!`;
        } else if (this.winnerNumber === 1) {
            return `${this.playerOneName} beat ${this.playerTwoName}!`;
        } else if (this.winnerNumber === 2) {
            return `${this.playerTwoName} beat ${this.playerOneName}!`;
        } else {
            return `${this.playerOneName} vs. ${this.playerTwoName}`;
        }
    }
    playInColumn(index) {
        this.columns[index].add(this.currentPlayer);
        this.checkForTie();
        if (this.winnerNumber === 0) {
            this.checkForColumnWin();
            this.checkForRowWin();
            this.checkForDiagonalWin();
        }

        if (this.currentPlayer === 1) {
            this.currentPlayer = 2;
        } else {
            this.currentPlayer = 1;
        }
    }
    checkForTie() {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++){
            if (this.isColumnFull(columnIndex) !== true) {
                return;
            }
        }
        this.winnerNumber = 3;

    }
    getTokenAt(rowIndex, columnIndex) {
        let correctColumn = this.columns[columnIndex];
        return correctColumn.getTokenAt(rowIndex);
    }
    isColumnFull(columnIndex) {
        if (this.winnerNumber === 1 || this.winnerNumber === 2) {
            return true;
        }
        return this.columns[columnIndex].isFull();
    }
    checkForColumnWin() {
        for (let columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
            const inspectedColumn = new ColumnWinInspector(this.columns[columnIndex]);
            const inspectedColumnOutput = inspectedColumn.inspect()
            if (inspectedColumnOutput === 1 || inspectedColumnOutput === 2) {
                this.winnerNumber = inspectedColumnOutput;
                break;
            }
        }
    }
    checkForRowWin() {
        for (let column = 0; column < 4; column++) {
            const columns = this.columns.slice(column, column + 4)
            const rowCheck = new RowWinInspector(columns);
            const rowCheckOutput = rowCheck.inspect();
            if (rowCheckOutput === 1 || rowCheckOutput === 2) {
                this.winnerNumber = rowCheckOutput;
                break;
            }
        }
    }
    checkForDiagonalWin() {
        for (let column = 0; column < 4; column++) {
            const columns = this.columns.slice(column, column + 4)
            const diagonalCheck = new DiagonalWinInspector(columns);
            const diagonalCheckOutput = diagonalCheck.inspect();
            if (diagonalCheckOutput === 1 || diagonalCheckOutput === 2) {
                this.winnerNumber = diagonalCheckOutput;
                break;
            }
        }
    }
}

export { Game };