/*
    Modals (boxes that hover overtop the UI)
*/

// Imports
const globals = require('./globals');
const misc = require('./misc');
const lobby = require('./lobby/main');
const game = require('./game/main');

// The list of all of the modals
const modals = [
    'password',
    // "warning" and "error" are intentionally omitted, as they are handled separately
];

// Initialize the modals
$(document).ready(() => {
    // All modals
    for (const modal of modals) {
        $(`#${modal}-modal-cancel`).click(closeAll);
    }

    // Password
    $('#password-modal-password').on('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            $('#password-modal-submit').click();
        }
    });
    $('#password-modal-submit').click(passwordSubmit);

    // Warning
    $('#warning-modal-button').click(() => {
        $('#warning-modal').fadeOut(globals.fadeTime);
        if ($('#lobby').is(':visible')) {
            $('#lobby').fadeTo(globals.fadeTime, 1);
        }
        if ($('#game').is(':visible')) {
            $('#game').fadeTo(globals.fadeTime, 1);
        }
    });

    // Error
    $('#error-modal-button').click(() => {
        window.location.reload();
    });
});

exports.passwordShow = (gameID) => {
    $('#lobby').fadeTo(globals.fadeTime, 0.25);
    misc.closeAllTooltips();

    $('#password-modal-id').val(gameID);
    $('#password-modal').fadeIn(globals.fadeTime);
    $('#password-modal-password').focus();
};

const passwordSubmit = (event) => {
    event.preventDefault();
    $('#password-modal').fadeOut(globals.fadeTime);
    $('#lobby').fadeTo(globals.fadeTime, 1);
    const gameID = parseInt($('#password-modal-id').val(), 10); // The server expects this as a number
    const passwordPlaintext = $('#password-modal-password').val();
    const password = hex_sha256(`Hanabi game password ${passwordPlaintext}`);
    globals.conn.send('gameJoin', {
        gameID,
        password,
    });
};

exports.warningShow = (msg) => {
    if ($('#lobby').is(':visible')) {
        $('#lobby').fadeTo(globals.fadeTime, 0.25);
    }
    if ($('#game').is(':visible')) {
        $('#game').fadeTo(globals.fadeTime, 0.25);
    }
    misc.closeAllTooltips();
    game.chat.hide();

    $('#warning-modal-description').html(msg);
    $('#warning-modal').fadeIn(globals.fadeTime);
};

exports.errorShow = (msg) => {
    // Do nothing if we are already showing the error modal
    if (globals.errorOccured) {
        return;
    }
    globals.errorOccured = true;

    if ($('#lobby').is(':visible')) {
        $('#lobby').fadeTo(globals.fadeTime, 0.1);
    }
    if ($('#game').is(':visible')) {
        $('#game').fadeTo(globals.fadeTime, 0.1);
    }
    misc.closeAllTooltips();
    game.chat.hide();

    // Clear out the top navigation buttons
    lobby.nav.show('nothing');

    $('#error-modal-description').html(msg);
    $('#error-modal').fadeIn(globals.fadeTime);
};

const closeAll = () => {
    for (const modal of modals) {
        $(`#${modal}-modal`).fadeOut(globals.fadeTime);
    }
    $('#lobby').fadeTo(globals.fadeTime, 1);
};
exports.closeAll = closeAll;
