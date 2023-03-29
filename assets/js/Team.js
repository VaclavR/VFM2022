import { getTeamsFromFirebase, getPlayersFromFirebase, getTeamById } from './model.js';
import { teamRow, playerRow } from './html.js';

export class Team {
    constructor() {
      this.firstPlayersRender = true;
      this.firstTeamsRender = true;
    }

    handleSortClick = (sortEl, row) => (e) => {
        const clickedElement = e.target;
        const column = clickedElement.getAttribute('data-sort');
        const direction = clickedElement.getAttribute('data-direction');
        const dataElement = sortEl.closest('.table').querySelector('[data-sort-data]');
        const dataType = dataElement.getAttribute('data-sort-data');
        this.sort(this[dataType], column, direction);
        clickedElement.dataset.direction = direction === 'asc' ? 'dsc' : 'asc';
        this.renderData(this[dataType], dataElement, row);
    }

    handleTeamClick = (e) => {
        const clickedElement = e.target.closest('[data-team-id]');
        if (clickedElement) {
            const teamId = parseInt(clickedElement.getAttribute('data-team-id'));
            this.renderTeamPlayers(teamId);
        }
    }
    
    initSort = (sortEl, row) => {
        let handleSortClick = this.handleSortClick(sortEl, row);
        sortEl.addEventListener('click', handleSortClick);
    }

    sort = (data, column, direction) => {
        if (direction === 'asc') {
            data.sort((a, b) => a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0);
        } else {
            data.sort((a, b) => a[column] > b[column] ? -1 : a[column] < b[column] ? 1 : 0);
        }
    }

    renderData = (data, element, row) => {
        let rows = '';

        data.forEach(item => {
            rows += row(item);
        })

        element.innerHTML = rows;

        if (this.firstTeamsRender) {
            element.addEventListener('click', this.handleTeamClick);
            this.firstTeamsRender = false;
        }
    }

    getAndRenderAllTeams = async () => {
        try {
            this.teams = await getTeamsFromFirebase();
            const table = document.getElementById('team-list');
            const sortControlEl = table.querySelector('[data-sort-control]')
            const teamListEl = table.querySelector('[data-sort-data]');
            this.renderData(this.teams, teamListEl, teamRow);
            this.initSort(sortControlEl, teamRow);
        } catch (error) {
            console.log(error);
        }
    }

    renderTeamPlayers = async (teamId) => {
        try {
            this.players = await getPlayersFromFirebase(teamId);
            const playerBoxEl = document.getElementById('box-2');
            const teamNameEl = playerBoxEl.querySelector('[data-team-name]');
            const playerListEl = playerBoxEl.querySelector('[data-sort-data]');
            const sortControlEl = playerBoxEl.querySelector('[data-sort-control]')
            getTeamById(teamId)
                .then(team => {
                    teamNameEl.textContent = team.name;
                })
                .catch(error => {
                    console.log(error);
                })
            this.renderData(this.players, playerListEl, playerRow);
            
            if (this.firstPlayersRender) {
                this.initSort(sortControlEl, playerRow);
                playerBoxEl.classList.remove('d-none');
                this.firstPlayersRender = false;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
