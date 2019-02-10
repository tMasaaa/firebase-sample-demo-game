'use strict';
import {
    DB
} from '../main.js';

const swit = (VAL, ME) => {
    const YOU = (ME === 'p1') ? 'p2' : 'p1';
    const progress = ~~(Math.random() * 4) * (ME == 'p1' ? 1 : -1);
    const pos = (VAL[ME] + progress) < 1 ? 1 : (VAL[ME] + progress) > 16 ? 16 : (VAL[ME] + progress);

    // update display
    document.querySelectorAll('#board > div').forEach(i => {
        i.style.backgroundColor = '#AAA';
    });
    document.querySelector(`#board > div:nth-child(${VAL[YOU]})`).style.backgroundColor = (YOU === 'p1') ? 'red' : 'green';
    document.querySelector(`#board > div:nth-child(${VAL[ME]})`).style.backgroundColor = (ME === 'p1') ? 'red' : 'green';
    // check winner
    if (VAL['p1'] < VAL['p2']) {
        document.querySelector('#console').innerText = (ME === VAL['turn']) ? 'Your Turn' : "Opponent's Turn";
    } else {
        document.querySelector('#console').innerText = (VAL['turn'] === ME) ? 'You LOSE...' : 'YOU WIN!!!';
        document.querySelector('#console').style.color = (VAL['turn'] === ME) ? 'blue' : 'red';
    }
    // button down -> update DB
    document.querySelector('#btn').addEventListener('pointerdown', e => {
        if (ME === VAL['turn'] && (VAL['p1'] < VAL['p2'])) {
            // console.log(progress, VAL['turn'], ME, pos, ':', YOU, VAL[YOU]);
            VAL[ME] = pos;
            VAL['turn'] = YOU;
            DB.data.set(JSON.stringify(VAL));
        }
    });
};
export {
    swit
};