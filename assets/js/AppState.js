import { getTeamsFromFirebase, getPlayersFromFirebase } from "./model";

class AppState {
	constructor() {
		this.teams = [];
		this.players = [];
		this.currentTeamId = null;
		this.currentTeamName = '';
		this.sort = {
			dataType: '',
			players: {
				column: null,
				direction: 'asc'
			},
			teams: {
				column: null,
				direction: 'asc'
			}
		};
	}

	watchState = (interval = 10000) => {
		setInterval(() => {
			console.dir(this);
		}, interval);
	};

	async loadTeams() {
		try {
			this.teams = await getTeamsFromFirebase();
		} catch (error) {
			console.log(error);
		}
	}

	async loadPlayers() {
		try {
			this.players = await getPlayersFromFirebase(this.currentTeamId);
		} catch (error) {
			console.log(error);
		}
	}
}

export const appState = new AppState();
