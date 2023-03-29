import { Team } from "./Team";
import teamsHeaderHtml from 'bundle-text:../../templates/teams-header.html';
import playersHeader from 'bundle-text:../../templates/players-header.html';

export class App {

  constructor() {
    this.team = new Team();
  }

  static renderNoJsHtml = () => {
    document.getElementById('box-1').innerHTML = teamsHeaderHtml;
    document.getElementById('box-2').innerHTML = playersHeader;
  }

  start() {
    App.renderNoJsHtml();
    requestAnimationFrame(() => {
      this.team.getAndRenderAllTeams();
    });
  }
}
