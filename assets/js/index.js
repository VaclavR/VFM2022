import { app } from "./App";
import { service } from './Service';

document.addEventListener("DOMContentLoaded", () => {
	app.start();
});

document.addEventListener('languageChange', () => {
	service.translatePage();
});
