import { appState } from "../AppState";
import { classNames } from '../classNames';
import { trans } from "../Service";

export const teamRow = (team) => {
	const activeClass = appState.currentTeamId === team.id ? ` ${classNames.activeRow}` : '';
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

export const teamHeader = () => {
	return  /*html*/`
    <h2 class="heading mb-20" data-trans="choose_team"></h2>
        <div class="table" id="team-list">
            <div class="row text-bold" data-sort-control>
                <div class="col-20">
                    <div class="clickable-el sort" 
                    data-sort="name" data-direction="dsc" data-trans="team"></div>
                </div>
                <div class="col-20">
                    <div class="clickable-el sort" data-sort="stadium" data-direction="dsc" data-trans="stadium"></div>
                </div>
                <div class="col-20">
                    <div class="clickable-el sort" data-sort="capacity" data-direction="dsc" data-trans="capacity"></div>
                </div>
                <div class="col-20">
                    <div class="clickable-el sort" data-sort="city" data-direction="dsc" data-trans="city"></div>
                </div>
                <div class="col-20">
                    <div class="clickable-el sort" data-sort="sponsor" data-direction="dsc" data-trans="sponsor"></div>
                </div>
            </div>
            <hr class="separator mt-10 mb-10">
            <div data-sort-data="teams"></div>
        </div>
    `;
};
