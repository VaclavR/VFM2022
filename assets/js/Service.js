import { appState } from './AppState';
import cs from '../translates/cs.json';
import en from '../translates/en.json';

class Service {
	
	constructor(appState) {
		this.appState = appState;
		this.translates = {
			cs: cs,
			en: en
		};
	}

	static languageChangedEvent = new CustomEvent('languageChange');

	price = (price, currency = 'CZK') => {
		return new Intl.NumberFormat('cs-CS', {
			style: 'currency',
			currency: currency,
		}).format(price);
	};

	sort = () => {
		const dataType = this.appState.sort.dataType;
		const direction = this.appState.sort[dataType].direction;
		const column = this.appState.sort[dataType].column;
		if (direction === 'asc') {
			this.appState[dataType].sort((a, b) => a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0);
		} else {
			this.appState[dataType].sort((a, b) => a[column] > b[column] ? -1 : a[column] < b[column] ? 1 : 0);
		}
	};

	switchLanguage = () => {
		this.appState.language = this.appState.language === 'cs' ? 'en' : 'cs';
		document.dispatchEvent(Service.languageChangedEvent);
	};

	translatePage = () => {
		const transElement = document.querySelectorAll('[data-trans]');
		transElement.forEach((transEl) => {
			const translate = this.translates[this.appState.language][transEl.dataset.trans];
			transEl.textContent = translate ? translate : transEl.dataset.trans;
		});
		localStorage.setItem('language', this.appState.language);
	};
}

export const service = new Service(appState);
