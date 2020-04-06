import React, { useState, useEffect } from 'react';

import minefield from './minefield-game/minefield';

import './index.scss';

const levelName = 'Hard';
let minefieldGame;

export default function Minefield() {
    const [level, setLevel] = useState({});
    const [game, setGame] = useState({});
    const [rows, setRows] = useState([]);
    const [version, setVersion] = useState(0);

    useEffect(() => {
        minefieldGame = minefield.createMinefield(levelName);
        setGame(minefieldGame);
        setLevel(minefieldGame.level);
        setRows(minefieldGame.rows);
    }, []);

    function restart() {
        minefieldGame = minefield.createMinefield(levelName);
        setGame(minefieldGame);
        setLevel(minefieldGame.level);
        setRows(minefieldGame.rows);
        setVersion(version + 1);
    }

    function squareClick(square) {
        if (!minefieldGame.isFinished) {
            minefieldGame.show(square);
            setGame(minefieldGame);
            setVersion(version + 1);
        }
    }

    const { rows: rowsQty, columns, bombs } = level;

    return (
        <section className="campo-minado">
            <div className="config">
                <div>Level: {levelName}</div>
                <div>Rows: {rowsQty}</div>
                <div>Columns: {columns}</div>
                <div>Bombs: {bombs}</div>

                {game.hasStarted &&
                    <button 
                        className=""
                        onClick={() => restart()}>
                        Restart
                    </button>
                }
            </div>
            <div className="main">
                {rows.map(row => (
                    <div 
                        key={row.rowIndex}
                        className="square-row"
                    >
                        {row.squares.map(square => (
                            <div 
                                key={square.address.squareIndexInMinefield}
                                className={`
                                    square 
                                    ${minefieldGame.shouldPaintAsEven(square) ? 'even' : 'odd'}
                                    ${square.showingResult ? 'showing' : 'not-showing'}
                                `}
                                onClick={() => squareClick(square)}
                            >
                                {square.showingResult && !square.hasBomb && square.getNumberOfNeighborsWithBombs()}
                                {square.showingResult && square.hasBomb && 'B'}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
