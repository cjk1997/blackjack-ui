import React, {Component} from 'react';
import GameView from './GameView';
import Card from './Card';
import './Game.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDeck : [],
        };
    };

    getCards = () => {
        const url = process.env.REACT_APP_API_URL;
        fetch(`${url}`)
            .then(response => response.json())
            .then(data => this.setState({ cardDeck : data }))
            .catch(err => err);
    };

    shuffleCards = (cardDeck) => {
        for(let i = this.state.cards.length - 1; i > 0; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            let temporary = cardDeck[i];
            cardDeck[i] = cardDeck[j];
            cardDeck[j] = temporary;
        };
    };


    render() {
        return (
            <>
                <div className="game">
                    <div className="cards">
                        <div className="playerHand"/>
                        <div className="house"/>
                        <div className="deck"/>
                    </div>
                    <div className="gameButtons">
                        <input type="button" className="hitMeButton" value="Hit Me!"/>
                        <input type="button" className="stayButton" value="Stay"/>
                    </div>
                    <div className="otherButtons">
                        <input type="button" className="restartButton" value="Start Again"/>
                        <input type="button" className="homeButton" value="Home"/>
                    </div>
                </div>
            </>
        );
    };
};

export default Game;