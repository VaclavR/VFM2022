import { service } from './Service';
import { team }  from "./Team";
import { teamHeader } from "./templates/teams";
import { playerHeader } from "./templates/players";
import { languageSwitcher } from "./templates/languageSwitcher";

class App {

	constructor() {}

	renderNoJsHtml = () => {
		document.getElementById('language-switcher').innerHTML = languageSwitcher();
		document.getElementById('box-1').innerHTML = teamHeader();
		document.getElementById('box-2').innerHTML = playerHeader();
	};
	
	start() {
		this.renderNoJsHtml();
		requestAnimationFrame(() => {
			team.getAndRenderAllTeams();
			service.translatePage();
		});
		document.getElementById('language-switcher').addEventListener('click', () => {
			service.switchLanguage();
		});
	}
}

export const app = new App(team);
