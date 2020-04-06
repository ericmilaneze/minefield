export default class row {
    constructor(minefield, rowIndex) {
        this.minefield = minefield;
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

    getSquareFromColumn(columnIndex) {
        return this.squares.find(s => s.address.squareIndexInRow === columnIndex);
    }

    getRowAbove() {
        if (this.rowIndex <= 0) {
            return null;
        }

        return this.minefield.rows.find(r => r.rowIndex === this.rowIndex - 1);
    }

    getRowBelow() {
        if (this.rowIndex >= this.minefield.rows.length - 1) {
            return null;
        }

        return this.minefield.rows.find(r => r.rowIndex === this.rowIndex + 1);
    }
}
