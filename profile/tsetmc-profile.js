const api = require('../dist/index.js');

/**
 * run with the following command to check the performance
 * 
 * NODE_ENV=produciton node --prof profile/tsetmc-profile.js
 * node --prof-process <generated-file>.log
 */
(async () => {
    const result = await api.intraday('32338211917133256', '2020-03-16');
})();