/*
    The lobby is composed of all of the UI elements that don't have to do with the game itself
*/

exports.createGame = require('./createGame');
exports.history = require('./history');
exports.keyboard = require('./keyboard');
exports.login = require('./login');
exports.nav = require('./nav');
exports.pregame = require('./pregame');
exports.settings = require('./settings');
exports.tables = require('./tables');
require('./tutorial');
exports.users = require('./users');

// Also make it available to the window so that we can access global variables
// from the JavaScript console (for debugging purposes)
window.lobby = exports;
