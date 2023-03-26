import { Team } from "./Team";


// import { getTeamsFromFirebase, getPlayersFromFirebase } from './firebase.js';
// // import data from '../../data/teams.json';

// const renderTeamList = (teams) => {
//   const teamListEl = document.getElementById('team-list');
//   let teamRows = '';

//   teams.forEach(team => {
//     const teamRow = /*html*/ `
//       <div class="row mb-5 team-row" data-team-id="${team.id}">
//           <div class="col-40">
//             <div>${team.name}</div>
//           </div>
//           <div class="col-20">
//             <div>${team.stadium.name}</div>
//           </div>
//           <div class="col-20">
//             <div>${team.stadium.capacity}</div>
//           </div>
//           <div data-players></div>
//       </div>
//     `
//     teamRows += teamRow;
//   })

//   teamListEl.innerHTML = teamRows;
//   teamListEl.addEventListener('click', (e) => {
//     clickedElement = e.target.closest('[data-team-id]');
//     if (clickedElement) {
//       const teamId = parseInt(clickedElement.getAttribute('data-team-id'));
//       getPlayers(teamId);
//     }
//   })
// }

// const renderPlayers = (players) => {
//     console.log(players);
// }

// async function getTeams() {
//   try {
//     const teams = await getTeamsFromFirebase();
//     console.log(teams);
//     renderTeamList(teams);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getPlayers(teamId) {
//   try {
//     const players = await getPlayersFromFirebase(teamId);
//     renderPlayers(players);
//   } catch (error) {
//     console.log(error);
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  Team.renderAllTeams()
    .catch(error => console.log(error));
});