import React, { useState, useEffect } from 'react';

import minefield from './minefield-game/minefield';

import './index.scss';

import { FiFlag } from "react-icons/fi";
import { FaBomb } from "react-icons/fa";

const levelName = 'Medium';
let minefieldGame;

export default function Minefield() {
    const [game, setGame] = useState({});
    const [version, setVersion] = useState(0);

    useEffect(() => {
        minefieldGame = minefield.createMinefield(levelName);
        setGame(minefieldGame);
    }, []);

    function restart() {
        minefieldGame = minefield.createMinefield(levelName);
        setGame(minefieldGame);
        setVersion(version + 1);
    }

    function squareClick(square) {
        minefieldGame.show(square);
        setGame(minefieldGame);
        setVersion(version + 1);
    }

    function squareRightClick(evt, square) {
        evt.preventDefault();
        square.toggleFlag();
        setGame(minefieldGame);
        setVersion(version + 1);
    }

    const { rows: rowsQty, columns, bombs } = game.level || {};

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
                {game.rows && game.rows.map(row => (
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
                                onContextMenu={evt => squareRightClick(evt, square)}
                            >
                                {square.showingResult && !square.hasBomb && square.getNumberOfNeighborsWithBombs()}
                                {square.showingResult && square.hasBomb && <FaBomb />}
                                {square.hasFlag && <FiFlag />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
