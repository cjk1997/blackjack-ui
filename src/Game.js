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
            players.push(player);
        };
    };

    getPoints = (player) => {
        let points = 0;
        for (let i = 0; i < players[player].hand.length - 1; i++) {
            points += players[player].hand[i].value
        };
        players[player].points = points;
        return points;
    };

    updatePoints = () => {
        for (let i = 0; i < players.length; i++) {
            this.getPoints(i);
            document.getElementById('player_' + i).innerHTML = players[i].points;
        };
    };

    dealCards = () => {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < players.length; j++) {
                let card = cardDeck.pop();
                players[j].hand.push(card);
                renderCard(card, j);
                updatePoints();
            };
        };
        updateDeck();
    };

    renderCard = (card, player) => {
        let hand = getElementById('hand_' + player);
        hand.appendChild(addCard(card));
    };

    addCard = (card) => {
        let add = getElementByClassName('card');
        add.innerHTML = card.name + ' of ' + card.suit;
        return add;
    };

    hitMe = () => {
        let card = deck.pop();
        players[this.state.currentPlayer].hand.push(card);
        renderCard(card, this.state.currentPlayer);
        updatePoints();
        updateDeck();
        check();
    };

    check = () => {
        if (players[this.state.currentPlayer].points > 21) {
            document.getElementById('status').innerHTML = 'Player: ' + players[this.state.currentPlayer].ID + ' LOST'
        };
    };

    stay = () => {
        if (this.state.currentPlayer != players.length - 1) {
            document.getElementById('player_' + this.state.currentPlayer).classList.remove('active');
            this.state.currentPlayer += 1;
            document.getElementById('player_' + this.state.currentPlayer).classList.add('active');
        } else {
            end();
        };
    };

    end = () => {
        let winner = -1;
        let score = 0;

        for (let i = 0; i < players.length - 1; i++){
            if (players[i].points > score && players[i].points < 22) {
                winner = i;
            };
            score = players[i].points;
        };
        document.getElementById('status').innerHTML = "Winner: Player " + players[winner].id;
    };

    check = () => {
        if (players[currentPlayer].points > 21) {
            document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
        };
    };

    updateDeck = () => {
        document.getElementById('deckcount').innerHTML = cardDeck.length;
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