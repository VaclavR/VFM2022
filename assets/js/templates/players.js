import { service, trans } from "../Service";
import { appState } from "../AppState";

export const playerHeader = () => {

	return /*html*/ `
	<h2 class="heading mb-20"><span data-trans="team_roster"></span> <span data-team-name></span></h2>
	<div class="table" data-players-table>
		<div class="row text-bold" data-sort-control>
			<div class="col-20">
				<div class="clickable-el sort" 
					data-sort="name" data-direction="dsc" data-trans="name"></div>
			</div>
			<div class="col-20">
				<div class="clickable-el sort" 
					data-sort="age" data-direction="dsc" data-trans="age"></div>
			</div>
			<div class="col-20">
				<div class="clickable-el sort" 
					data-sort="position" data-direction="dsc" data-trans="position"></div>
			</div>
			<div class="col-20">
				<div class="clickable-el sort" 
					data-sort="price" data-direction="dsc" data-trans="price"></div>
			</div>
		</div>
		<hr class="separator mt-10 mb-10">
		<div data-sort-data="players"></div>
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
            <div>${service.price(player.price)}</div>
        </div>
    </div>
`;
