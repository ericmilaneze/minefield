import React, { useState, useEffect } from 'react';
import { FiFlag } from "react-icons/fi";
import { FaBomb, FaTrophy } from "react-icons/fa";
import { MdCached } from 'react-icons/md';

import Modal from '../Modal';

import minefield from '../minefield-game/minefield';
import levels from '../minefield-game/levels';

import './index.scss';

export default function Minefield() {
    const [game, setGame] = useState({});
    const [version, setVersion] = useState(0);
    const [levelName, setLevelName] = useState(levels[0].name);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    useEffect(() => {
        const newGame = minefield.createMinefield(levelName, getRecord, storeRecord);
        
        setGame(newGame);
    }, [levelName]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (game) {
                setElapsedSeconds(game.getElapsedSeconds());
            }
        }, 100);

        return () => clearInterval(interval);
    }, [game]);

    function storeRecord(record) {
        localStorage.setItem('record', record);
    }

    function getRecord() {
        return localStorage.getItem('record');
    }

    function restart() {
        const newGame = minefield.createMinefield(levelName, getRecord, storeRecord);
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
        game.toggleFlag(square);
        setGame(game);
        setVersion(version + 1);
    }

    function changeLevel(levelName) {
        setLevelName(levelName);
    }

    return (
        <section className="campo-minado">
            <Modal show={game.win}>
                <div className="modal-endgame win">
                    <p>You win!</p>
                    <div className="row">
                        <div className="record">
                            <div className="trophies">
                                <div className="trophy"><FaTrophy /></div>
                                <div className="trophy"><FaTrophy /></div>
                                <div className="trophy"><FaTrophy /></div>
                                <div className="trophy"><FaTrophy /></div>
                            </div>
                            <div className="seconds">{getRecord()} seconds</div>
                            <div className="trophies">
                                <div className="trophy"><FaTrophy /></div>
                                <div className="trophy"><FaTrophy /></div>
                                <div className="trophy"><FaTrophy /></div>
                                <div className="trophy"><FaTrophy /></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <button
                            onClick={restart}
                        >
                            <MdCached />
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal show={game.lose}>
                <div className="modal-endgame lose">
                    <p>You lose!</p>
                    <div className="row">
                        <button
                            onClick={restart}
                        >
                            <MdCached />
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="game">
                <div className="config">
                    <div>
                        <div className="flag"><FiFlag /> {game.qtyFlagsMissing}</div>

                        <select 
                            onChange={(evt) => changeLevel(evt.target.value)}
                        >
                            {levels.map((level) => (
                                <option value={level.name} key={level.name}>{level.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div className="elapsedSeconds">{elapsedSeconds > 0 && elapsedSeconds}</div>
                    </div>
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
                                        ${levelName && levelName.toLowerCase()}
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
            </div>
        </section>
    );
}
