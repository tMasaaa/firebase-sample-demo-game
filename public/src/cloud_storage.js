'use strict';
const config = {
    apiKey: "AIzaSyBstMUcizSkipYd8tEIcfNpaUL1Y5ZQ_eg",
    authDomain: "sample-demo-game.firebaseapp.com",
    databaseURL: "https://sample-demo-game.firebaseio.com",
    projectId: "sample-demo-game",
    storageBucket: "sample-demo-game.appspot.com",
    messagingSenderId: "572481677312"
};
firebase.initializeApp(config);

const sampleGame = firebase.database().ref('samplegame');
const ticket = firebase.database().ref('samplegame/ticket');
const gameData = firebase.database().ref('samplegame/data');

export default {
    getTicketOnce: () => ticket.once('value'),
    setTicket: uid => ticket.set([Date.parse(new Date(), uid)]),
    setGameData: data => gameData.set(JSON.stringify(data)),
    removeAll: () => sampleGame.remove(),
    removeTicket: () => ticket.remove(),
    gameDataOnUpdate: func => gameData.on('value', func)
}