import { getTeamsFromFirebase, getPlayersFromFirebase, getTeamById } from './model.js';

export class Team {
    constructor(id, name, stadium, players) {
        this.id = id;
        this.name = name;
        this.stadium = stadium;
        this.players = players;
    }

    priceFormat = new Intl.NumberFormat('cs-CS', {
        style: 'currency',
        currency: 'CZK',
      });

    initSort = (el) => {
        
    }  

    renderAllTeams = async () => {
        try {
            const teams = await getTeamsFromFirebase();
            const table = document.getElementById('team-list');
            const teamListEl = table.querySelector('[data-team-list]');
            let teamRows = '';

            teams.forEach(team => {
                const teamRow = /*html*/ `
                <div class="row mb-5 clickable-el" data-team-id="${team.id}">
                    <div class="col-20">
                        <div>${team.name}</div>
                    </div>
                    <div class="col-20">
                        <div>${team.stadium}</div>
                    </div>
                    <div class="col-20">
                        <div>${team.capacity}</div>
                    </div>
                    <div class="col-20">
                        <div>${team.city}</div>
                    </div>
                    <div class="col-20">
                        <div>${team.sponsor}</div>
                    </div>
                </div>
                `
                teamRows += teamRow;
            })

            teamListEl.innerHTML = teamRows;
            teamListEl.addEventListener('click', (e) => {
                const clickedElement = e.target.closest('[data-team-id]');
                if (clickedElement) {
                    const teamId = parseInt(clickedElement.getAttribute('data-team-id'));
                    this.renderTeamPlayers(teamId);
                }
            })
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
                    console.log(team);
                    teamNameEl.textContent = team.name;
                })
                .catch(error => {
                    console.log(error);
                })
            
            players.forEach(player => {
                const playerRow = /*html*/ `
                <div class="row mb-5 team-row" data-player-id="${player.id}">
                    <div class="col-20">
                        <div>${player.name}</div>
                    </div>
                    <div class="col-20">
                        <div>${player.age}</div>
                    </div>
                    <div class="col-20">
                        <div>${player.position}</div>
                    </div>
                    <div class="col-20">
                        <div>${this.priceFormat.format(player.price)}</div>
                    </div>
                </div>
                `
                playerRows += playerRow;
            })
            playerListEl.innerHTML = playerRows;
            playerBoxEl.classList.remove('d-none');
        } catch (error) {
            console.log(error);
        }
    }
}
