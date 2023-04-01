import { team }  from "./Team";
import { teamHeader } from "./templates/teams";
import { playerHeader } from "./templates/players";
import { languageSwitcher } from "./templates/languageSwitcher";

class App {

	constructor(team) {
		this.team = team;
	}

	static renderNoJsHtml = () => {
		document.getElementById('language-switcher').innerHTML = languageSwitcher();
		document.getElementById('box-1').innerHTML = teamHeader();
		document.getElementById('box-2').innerHTML = playerHeader();
	};

	start() {
		App.renderNoJsHtml();
		requestAnimationFrame(() => {
			this.team.getAndRenderAllTeams();
		});
	}
}

export const app = new App(team);
