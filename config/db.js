var hdb = require('hdb');
var config = hdb.createClient({
    host: 'vn1dvsrvd',
    port: 39015,
    user: 'MALASHREE',
    password: 'No12knows#', 
    db: 'HXE'
})
config.on('error', function (err) {
    console.error('Network connection error', err);
});
console.log(config.readyState);
config.connect(function (err) {

    if (err) {
        return console.error('Connect error', err);
    }
})
module.exports = config;