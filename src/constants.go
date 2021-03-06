package main

import (
	"time"
)

// iota starts at 0 and counts upwards
// i.e. statusLobby = 0, statusPregame = 1, etc.

const (
	statusLobby = iota
	statusPregame
	statusPlaying
	statusSpectating
	statusReplay
	statusSharedReplay
)

var (
	status = []string{
		"Lobby",
		"Pre-Game",
		"Playing",
		"Spectating",
		"Replay",
		"Shared Replay",
	}
)

const (
	actionTypeClue = iota
	actionTypePlay
	actionTypeDiscard
	actionTypeDeckPlay
	actionTypeTimeLimitReached
	actionTypeIdleLimitReached
)

const (
	clueTypeNumber = iota
	clueTypeColor
)

const (
	endConditionInProgress = iota
	endConditionNormal
	endConditionStrikeout
	endConditionTimeout
	endConditionAbandoned
)

const (
	replayActionTypeTurn = iota
	replayActionTypeArrow
	replayActionTypeLeaderTransfer
	replayActionTypeMorph
	replayActionTypeSound
)

const (
	// The maximum amount of clues (and the amount of clues that players start a game with)
	maxClues = 8

	// The amount of time that a game is inactive before it is killed by the server
	idleGameTimeout = time.Minute * 30

	// The amount of time that someone can be on the waiting list
	idleWaitingListTimeout = time.Hour * 8

	// The amount of time in between allowed @here Discord alerts
	discordAtHereTimeout = time.Hour * 2

	// Discord emotes
	pogChamp   = "<:PogChamp:254683883033853954>"
	bibleThump = "<:BibleThump:254683882601840641>"
)
