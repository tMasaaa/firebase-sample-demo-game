'use strict';
import {
    DB
} from '../main.js';

const init = () => {
    return new Promise(res => {
        const con = document.querySelector('#console');
        con.innerText = 'Connecting...';
        DB.ticket.once('value').then(e => {
            const val = e.val();
            const UID = localStorage.getItem('UID');
            if (val == null) { // first: p1
                firebase.database().ref('samplegame').remove();
                if (!UID) localStorage.setItem('UID', Math.random());
                DB.ticket.set([Date.parse(new Date()), UID]);
                con.innerText = 'Waiting Opponent...';
                document.querySelector('#board').style.transform = 'rotate(180deg)';
                res('p1');
            } else {
                DB.ticket.remove();
                if (Date.parse(new Date()) - val[0] <= 180000 && val[1] !== UID) { // within 3min -> OK
                    con.innerText = 'Game Start';
                    DB.data.set(initializeData());
                    res('p2');
                } else {
                    location.reload();
                }
            }
        });
    });
};

const initializeData = () => {
    const dat = {
        p1: 1,
        p2: 16,
        turn: ~~(Math.random() * 2) == 0 ? 'p1' : 'p2'
    }
    return JSON.stringify(dat);
};

export {
    init
};