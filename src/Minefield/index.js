import React, { useState, useEffect } from 'react';
import { FiFlag } from "react-icons/fi";
import { FaBomb } from "react-icons/fa";

import minefield from './minefield-game/minefield';
import levels from './minefield-game/levels';

import './index.scss';

export default function Minefield() {
    const [game, setGame] = useState({});
    const [version, setVersion] = useState(0);
    const [levelName, setLevelName] = useState(levels[Object.keys(levels)[0]].name)

    useEffect(() => {
        const newGame = minefield.createMinefield(levelName);
        setGame(newGame);
    }, [levelName]);

    function restart() {
        const newGame = minefield.createMinefield(levelName);
        setGame(newGame);
        setVersion(version + 1);
    }

    function squareClick(square) {
        game.show(square);
        setGame(game);
        setVersion(version + 1);
    }

    function squareRightClick(evt, square) {
        evt.preventDefault();
        square.toggleFlag();
        setGame(game);
        setVersion(version + 1);
    }

    function changeLevel(levelName) {
        setLevelName(levelName);
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
                        className="row"
                        onClick={() => restart()}>
                        Restart
                    </button>
                }

                <select 
                    className="row"
                    onChange={(evt) => changeLevel(evt.target.value)}
                >
                    {Object.keys(levels).map((level) => (
                        <option value={level} key={level}>{levels[level].name}</option>
                    ))}
                </select>
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
                                    ${game.shouldPaintAsEven(square) ? 'even' : 'odd'}
                                    ${square.showingResult ? 'showing' : 'not-showing'}
                                `}
                                onClick={() => squareClick(square)}
                                onContextMenu={evt => squareRightClick(evt, square)}
                            >
                                {square.showingResult && !square.hasBomb && square.getNumberOfNeighborsWithBombs() !== 0 && square.getNumberOfNeighborsWithBombs()}
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
