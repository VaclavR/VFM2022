import { app } from './App';
import { service } from './Service';

document.addEventListener('languageChange', () => {
	service.translatePage();
});

const domContentLoaded = new Promise((resolve) => {
	document.addEventListener('DOMContentLoaded', () => {
		resolve();
	});
});

const userAuthenticated = new Promise((resolve) => {
	document.addEventListener('userAuthenticated', () => {
		resolve();
	});
});

Promise.all([domContentLoaded, userAuthenticated]).then(() => {
	app.start();
});
