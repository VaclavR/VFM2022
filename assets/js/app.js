import { Team } from "./Team";

export class App {
  
  constructor() {
    this.team = new Team();
  }

  start() {
    this.team.renderAllTeams();
  }
}
