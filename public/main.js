'use strict';

import init from '/src/init.js';
import swit from './src/swit.js';
import cloudStorage from './src/cloud_storage.js';

// loading initialize once
init().then(me => {
   cloudStorage.gameDataOnUpdate(data => {
       if (data) {
           swit(data, me);
       }
   }); 
});