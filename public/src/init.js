'use strict';
import cloudStorage from './cloud_storage.js';

const init = () => {
    return new Promise(res => {
        const con = document.querySelector('#console');
        con.innerText = 'Connecting...';
        cloudStorage.getTicketOnce().then(e => {
            const val = e.val();
            const UID = localStorage.getItem('UID');
            if (val == null) { // first: p1
                cloudStorage.removeAll();
                if (!UID) localStorage.setItem('UID', Math.random());
                cloudStorage.setTicket(UID);
                con.innerText = 'Waiting Opponent...';
                document.querySelector('#board').style.transform = 'rotate(180deg)';
                res('p1');
            } else {
                cloudStorage.removeTicket();
                if (Date.parse(new Date()) - val[0] <= 180000 && val[1] !== UID) { // within 3min -> OK
                    con.innerText = 'Game Start';
                    cloudStorage.setGameData(initializeData());
                    res('p2');
                } else {
                    location.reload();
                }
            }
        });
    });
};

const initializeData = () => ({
    p1: 1,
    p2: 16,
    turn: ~~(Math.random() * 2) == 0 ? 'p1' : 'p2'
});

export default init;