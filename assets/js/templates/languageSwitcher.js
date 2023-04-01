import { appState } from "../AppState";
const url = appState.language === 'en' ? '/cs' : '/en';

export const languageSwitcher = () => {

	return /*html*/ `
		<a class="language-switcher__link" href="${url}">${appState.language}</a>
	`;
};
