import { service } from "./Service";
import { appState } from "./AppState";

export const teamRow = (team) => {
	const activeClass = appState.currentTeamId === team.id ? ' active' : '';
	return  /*html*/`
    <div class="row mb-5 clickable-el${activeClass}" data-team-id="${team.id}">
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
`;
};

export const playerRow = player => /*html*/ `
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
            <div>${service.priceFormat(player.price)}</div>
        </div>
    </div>
`;