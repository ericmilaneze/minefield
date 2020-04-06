import React, { useState, useEffect } from 'react';

import minefield from './minefield';

import './index.scss';

const levelName = 'Medium';
let game;
//let game = minefield.createMinefield(levelName);

export default function Minefield() {
    const [level, setLevel] = useState({});

    useEffect(() => {
        game = minefield.createMinefield(levelName);
        setLevel(game.level);
    }, []);

    const { rows, columns, bombs } = level;

    return (
        <section className="campo-minado">
            <div className="config">
                <div>Level: {levelName}</div>
                <div>Rows: {rows}</div>
                <div>Columns: {columns}</div>
                <div>Bombs: {bombs}</div>
            </div>
            <div className="main">
                {game && game.rows.map(row => (
                    <div 
                        key={row.rowIndex}
                        className="square-row"
                    >
                        {row.squares.map(square => (
                            <div 
                                key={square.squareIndex}
                                className={`square ${square.isEven() ? 'even' : 'odd'}`}
                            >
                                {square.hasBomb ? 'b' : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
