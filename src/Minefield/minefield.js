import levels from './levels';

class square {
    constructor(row) {
        this.hasBomb = false;
    }

    setRow(row, squareIndexInMinefield) {
        this.row = row;
        this.address = {
            rowIndex: row.rowIndex,
            squareIndexInRow: row.squares.length,
            squareIndexInMinefield
        };
    }

    isEven() {
        return this.address.squareIndexInMinefield % 2 === 0;
    }

    putBomb() {
        this.hasBomb = true;
    }
}

class row {
    constructor(minifield, rowIndex) {
        this.minefield = minifield;
        this.rowIndex = rowIndex;
        this.squares = [];
    }

    isEven() {
        return this.rowIndex % 2 === 0;
    }

    addSquare(square, squareIndexInMinefield) {
        square.setRow(this, squareIndexInMinefield);
        this.squares.push(square);
    }
}

export default class minefield {
    constructor(levelName, level) {
        this.levelName = levelName;
        this.level = level;
        this.rows = [];
        this.squares = [];
        this.squaresWithBombs = [];
    }

    static createMinefield(levelName) {
        const level = levels[levelName.toLowerCase()];

        const mf = new minefield(levelName, level);

        for (let i = 0; i < mf.level.rows; i++) {
            const row = mf._createRow(i);

            for (let j = 0; j < mf.level.columns; j++) {
                mf._createSquare(row);
            }
        }

        mf._distributeBombs();

        return mf;
    }

    _distributeBombs() {
        let currNumberOfBombs = 0;

        while (currNumberOfBombs < this.level.bombs) {
            const randomNumber = Math.floor(Math.random() * this.squares.length);

            const square = this.squares[randomNumber];

            if (!square.hasBomb) {
                square.putBomb();
                this.squaresWithBombs.push(square);

                currNumberOfBombs++;
            }
        }
    }

    _createRow(rowIndex) {
        const r = new row(this, rowIndex);

        this.rows.push(r);

        return r;
    }

    _createSquare(row) {
        const s = new square(row);

        row.addSquare(s, this.squares.length);

        this.squares.push(s);

        return s;
    }

};