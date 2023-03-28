import { getTeamsFromFirebase, getPlayersFromFirebase, getTeamById } from './model.js';
import { teamRow, playerRow } from './html.js';

export class Team {
    constructor(id, name, stadium, players) {
        // this.id = id;
        // this.name = name;
        // this.stadium = stadium;
        // this.players = players;
    }

    initSort = (sortEl, data, renderEl, row) => {
        sortEl.addEventListener('click', (e) => {
            const clickedElement = e.target;
            const column = clickedElement.getAttribute('data-sort');
            const direction = clickedElement.getAttribute('data-direction');
            this.sort(data, column, direction);
            clickedElement.dataset.direction = direction === 'asc' ? 'dsc' : 'asc';
            this.renderData(data, renderEl, row);
        })
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
        element.addEventListener('click', (e) => {
            const clickedElement = e.target.closest('[data-team-id]');
            if (clickedElement) {
                const teamId = parseInt(clickedElement.getAttribute('data-team-id'));
                this.renderTeamPlayers(teamId);
            }
        })
    }

    getAndRenderAllTeams = async () => {
        try {
            const teams = await getTeamsFromFirebase();
            const table = document.getElementById('team-list');
            const sortControlEl = table.querySelector('[data-sort-control]')
            const teamListEl = table.querySelector('[data-team-list]');
            this.renderData(teams, teamListEl, teamRow);
            this.initSort(sortControlEl, teams, teamListEl, teamRow);
        } catch (error) {
            console.log(error);
        }
    }

    renderTeamPlayers = async (teamId) => {
        try {
            const players = await getPlayersFromFirebase(teamId);
            const playerBoxEl = document.getElementById('box-2');
            const teamNameEl = playerBoxEl.querySelector('[data-team-name]');
            const playerListEl = playerBoxEl.querySelector('[data-player-list]');
            let playerRows = '';
            getTeamById(teamId)
                .then(team => {
                    teamNameEl.textContent = team.name;
                })
                .catch(error => {
                    console.log(error);
                })
            this.renderData(players, playerListEl, playerRow);
            playerBoxEl.classList.remove('d-none');
        } catch (error) {
            console.log(error);
        }
    }
}
