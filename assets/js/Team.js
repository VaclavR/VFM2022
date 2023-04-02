import { getTeamById } from './model';
import { teamRow } from './templates/teams';
import { playerRow } from './templates/players';
import { service } from './Service';
import { appState } from './AppState';
import { classNames } from './classNames';

class Team {
	constructor(appState, service) {
		this.appState = appState;
		this.service = service;
		this.firstPlayersRender = true;
		this.firstTeamsRender = true;
	}

	static setActiveRowClass = (element, cssClass = classNames.activeRow) => {
		const parent = element.parentNode;
		const lastActiveEl = parent.querySelector(`.${cssClass}`);
		lastActiveEl?.classList.remove(cssClass);
		element.classList.add(cssClass);
	};

	static setActiveColumnClass = (sortEl, clickedElement) => {
		sortEl.querySelector(`.${classNames.activeSort}`)?.classList.remove(classNames.activeSort);
		clickedElement.classList.add(classNames.activeSort);
	};

	handleTeamClick = (e) => {
		const clickedElement = e.target.closest('[data-team-id]');
		if (clickedElement) {
			this.appState.currentTeamId = parseInt(clickedElement.getAttribute('data-team-id'));
			this.renderTeamPlayers();
			Team.setActiveRowClass(clickedElement);
		}
	};

	initSort = (sortEl, row) => {
		const handleSortClick = this.handleSortClick(sortEl, row);
		sortEl.addEventListener('click', handleSortClick);
	};

	handleSortClick = (sortEl, row) => (e) => {
		const clickedElement = e.target;
		const column = clickedElement.getAttribute('data-sort');
		if (!column) return;
		const direction = clickedElement.getAttribute('data-direction');
		const dataElement = sortEl.closest('.table').querySelector('[data-sort-data]');
		const dataType = dataElement.getAttribute('data-sort-data');
		this.appState.sort.dataType = dataType;
		this.appState.sort[dataType].direction = direction;
		this.appState.sort[dataType].column = column;
		this.service.sort();
		Team.setActiveColumnClass(sortEl, clickedElement);
		clickedElement.dataset.direction = direction === 'asc' ? 'dsc' : 'asc';
		this.renderData(this.appState[dataType], dataElement, row);
	};

	renderData = (data, element, row, languageChange = false) => {
		let rows = '';

		data.forEach(item => {
			rows += row(item);
		});

		element.innerHTML = rows;

		if (this.firstTeamsRender || languageChange) {
			element.addEventListener('click', this.handleTeamClick);
			// this.appState.watchState();
			this.firstTeamsRender = false;
		}
	};

	getAndRenderAllTeams = async (languageChange = false) => {
		try {
			await this.appState.loadTeams();
			const table = document.getElementById('team-list');
			const sortControlEl = table.querySelector('[data-sort-control]');
			const teamListEl = table.querySelector('[data-sort-data]');
			this.renderData(this.appState.teams, teamListEl, teamRow, languageChange);
			this.initSort(sortControlEl, teamRow);
		} catch (error) {
			console.log(error);
		}
	};

	renderTeamPlayers = async (languageChange = false) => {
		try {
			await this.appState.loadPlayers();
			const playerBoxEl = document.getElementById('box-2');
			const teamNameEl = playerBoxEl.querySelector('[data-team-name]');
			const playerListEl = playerBoxEl.querySelector('[data-sort-data]');
			const sortControlEl = playerBoxEl.querySelector('[data-sort-control]');
			getTeamById(this.appState.currentTeamId)
				.then(team => {
					this.appState.currentTeamName = team.name;
					teamNameEl.textContent = team.name;
				})
				.catch(error => {
					console.log(error);
				});
			this.renderData(this.appState.players, playerListEl, playerRow);

			if (this.firstPlayersRender || languageChange) {
				this.initSort(sortControlEl, playerRow);
				playerBoxEl.classList.remove('d-none');
				this.firstPlayersRender = false;
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export const team = new Team(appState, service);
