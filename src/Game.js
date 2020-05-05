import React, {Component} from 'react';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDeck : [],
            players : [],
            currentPlayer : 0,
        };
    };

    startGame = () => {
        document.getElementById('startbutton').value = "Restart";
        document.getElementById('status').style.display="none";

        this.setState({ currentPlayer : 0 });
        this.getCards();
        this.shuffleCards();
        this.createPlayers();
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

    createPlayers = (numPlayers) => {
        for (let i = 1; 1 <= numPlayers; i++) {
            let hand = new Array();
            let player = { name : "Player" + i, ID : i, points : 0, hand : hand };
            players.push(player);
        };
    };

    render() {
        const renderPlayers = this.state.players.map((player) => {
            return(
                <>
                    <div className="player" id={"player_" + players.findIndex(player)} value={player.name}>
                        <div className="playerID" value={players.findIndex(player).ID}/>
                        <div className="hand" id={"hand_" + players.findIndex(player)} value={player.hand}/>
                        <div className="points" id={"points_" + players.findIndex(player)} value={player.points}/>
                    </div>
                </>
            );
        });

        return (
            <>
                <div className="game">
                    <div className="card"/>
                    <div className="gameBody">
                        <div className="gameButtons">
                            <input type="button" className="buttons" id="startbutton" value="Start" onClick={}/>
                            <input type="button" className="buttons" id="hitMeButton" value="Hit Me!" onClick={}/>
                            <input type="button" className="buttons" id="stayButton" value="Stay" onClick={}/>
                        </div>
                        <div className="status" id="status"/>
                        <div className="players" id="players">
                            {renderPlayers}
                        </div>
                        <div className="clear"/>
                    </div>
                </div>
            </>
        );
    };
};

export default Game;