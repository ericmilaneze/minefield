export default class square {
    constructor(row) {
        this.row = row;
        this.hasBomb = false;
        this.showingResult = false;
    }

    setRow(row, squareIndexInMinefield) {
        this.row = row;
        this.address = {
            rowIndex: row.rowIndex,
            squareIndexInRow: row.squares.length,
            squareIndexInMinefield
        };
    }

    getNeighbors() {
        const currRow = this.row;
        const rowAbove = this.row.getRowAbove();
        const rowBelow = this.row.getRowBelow();

        const currColumnNumber = this.address.squareIndexInRow;
        const leftColumnNumber = currColumnNumber - 1;
        const rightColumnNumber = currColumnNumber + 1;

        const neighbors = [];

        if (rowAbove) {
            neighbors.push(rowAbove.getSquareFromColumn(leftColumnNumber));
            neighbors.push(rowAbove.getSquareFromColumn(currColumnNumber));
            neighbors.push(rowAbove.getSquareFromColumn(rightColumnNumber));
        }

        neighbors.push(currRow.getSquareFromColumn(leftColumnNumber));
        neighbors.push(currRow.getSquareFromColumn(rightColumnNumber));

        if (rowBelow) {
            neighbors.push(rowBelow.getSquareFromColumn(leftColumnNumber));
            neighbors.push(rowBelow.getSquareFromColumn(currColumnNumber));
            neighbors.push(rowBelow.getSquareFromColumn(rightColumnNumber));
        }

        return neighbors.filter(n => n);
    }

    getNeighborsWithBombs() {
        const neighbors = this.getNeighbors();

        return neighbors.filter(n => n.hasBomb);
    }

    getNumberOfNeighborsWithBombs() {
        const neighbors = this.getNeighborsWithBombs();

        return neighbors.length;
    }

    show() {
        this.showingResult = true;
    }

    isEven() {
        return this.address.squareIndexInMinefield % 2 === 0;
    }

    putBomb() {
        this.hasBomb = true;
    }
}
