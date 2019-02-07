'use strict';

import {
    init
} from '/src/init.js';
import {
    swit
} from './src/swit.js';
// firebase initialize
const config = {
    apiKey: "AIzaSyBstMUcizSkipYd8tEIcfNpaUL1Y5ZQ_eg",
    authDomain: "sample-demo-game.firebaseapp.com",
    databaseURL: "https://sample-demo-game.firebaseio.com",
    projectId: "sample-demo-game",
    storageBucket: "sample-demo-game.appspot.com",
    messagingSenderId: "572481677312"
};
firebase.initializeApp(config);

// DB
const DB = {
    ticket: firebase.database().ref('samplegame/ticket'),
    data: firebase.database().ref('samplegame/data'),
};

let VAL, ME;
export {
    DB
};
// loading initialize once
init().then(me => {
    ME = me;
    // DB.data change -> update
    DB.data.on('value', e => {
        VAL = JSON.parse(e.val());
        if (VAL) {
            swit(VAL, ME);
        }
    });
})