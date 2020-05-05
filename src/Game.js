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
        this.dealCards();
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
            this.state.players.push(player);
        };
    };

    getPoints = (player) => {
        let points = 0;
        for (let i = 0; i < this.state.players[player].hand.length - 1; i++) {
            points += this.state.players[player].hand[i].value
        };
        this.state.players[player].points = points;
        return points;
    };

    updatePoints = () => {
        for (let i = 0; i < this.state.players.length; i++) {
            this.getPoints(i);
            document.getElementById('player_' + i).innerHTML = this.state.players[i].points;
        };
    };

    dealCards = () => {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < this.state.players.length; j++) {
                let card = this.state.cardDeck.pop();
                this.stateplayers[j].hand.push(card);
                this.renderCard(card, j);
                this.updatePoints();
            };
        };
        this.updateDeck();
    };

    renderCard = (card, player) => {
        let hand = document.getElementById('hand_' + player);
        hand.appendChild(this.addCard(card));
    };

    addCard = (card) => {
        let add = document.getElementByClassName('card');
        add.innerHTML = card.name + ' of ' + card.suit;
        return add;
    };

    hitMe = () => {
        let card = this.state.cardDeck.pop();
        this.state.players[this.state.currentPlayer].hand.push(card);
        this.renderCard(card, this.state.currentPlayer);
        this.updatePoints();
        this.updateDeck();
        this.check();
    };

    check = () => {
        if (this.state.players[this.state.currentPlayer].points > 21) {
            document.getElementById('status').innerHTML = 'Player: ' + this.state.players[this.state.currentPlayer].ID + ' LOST'
        };
    };

    stay = () => {
        if (this.state.currentPlayer !== this.state.players.length - 1) {
            document.getElementById('player_' + this.state.currentPlayer).classList.remove('active');
            this.state.currentPlayer += 1;
            document.getElementById('player_' + this.state.currentPlayer).classList.add('active');
        } else {
            this.end();
        };
    };

    end = () => {
        let winner = -1;
        let score = 0;

        for (let i = 0; i < this.state.players.length - 1; i++){
            if (this.state.players[i].points > score && this.state.players[i].points < 22) {
                winner = i;
            };
            score = this.state.players[i].points;
        };
        document.getElementById('status').innerHTML = "Winner: Player " + this.state.players[winner].id;
    };

    check = () => {
        if (this.state.players[this.state.currentPlayer].points > 21) {
            document.getElementById('status').innerHTML = 'Player: ' + this.state.players[this.state.currentPlayer].ID + ' LOST';
        };
    };

    updateDeck = () => {
        document.getElementById('deckcount').innerHTML = this.state.cardDeck.length;
    };

    render() {
        const renderPlayers = this.state.players.map((player) => {
            return(
                <>
                    <div className="player" id={"player_" + this.state.players.findIndex(player)} value={player.name}>
                        <div className="playerID" value={this.state.players.findIndex(player).ID}/>
                        <div className="hand" id={"hand_" + this.state.players.findIndex(player)} value={player.hand}/>
                        <div className="points" id={"points_" + this.state.players.findIndex(player)} value={player.points}/>
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
                            <input type="button" className="buttons" id="startbutton" value="Start" onClick={this.startGame}/>
                            <input type="button" className="buttons" id="hitMeButton" value="Hit Me!" onClick={this.hitMe}/>
                            <input type="button" className="buttons" id="stayButton" value="Stay" onClick={this.stay}/>
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