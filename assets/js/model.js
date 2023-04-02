import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, get, child, query, onValue, orderByChild, equalTo } from 'firebase/database';
import { firebaseConfig } from '../../secret/firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// get reference to data in the database
const dbRef = ref(database);
const teamsRef = ref(database, 'teams');
const playersRef = ref(database, 'players');

const auth = getAuth();
const userAuthenticatedEvent = new CustomEvent('userAuthenticated');

signInAnonymously(auth)
	.then(() => {
		document.dispatchEvent(userAuthenticatedEvent);
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
	});

export const getPlayersFromFirebase = async (teamId) => {
	const playersQuery = query(
		playersRef,
		orderByChild('teamId'),
		equalTo(teamId));
	return new Promise((resolve, reject) => {
		onValue(playersQuery, (snapshot) => {
			const data = snapshot.val();
			const players = Array.isArray(data) ? data : Object.values(data);
			resolve(players);
		}, (error) => {
			reject(error);
		});
	});
};

export const getTeamById = async (teamId) => {
	const teamSnapshot = await get(child(dbRef, `teams/${teamId - 1}`));
	if (teamSnapshot.exists()) {
		const team = teamSnapshot.val();
		return team;
	} else {
		console.log('Tým s ID', teamId, 'neexistuje v databázi.');
	}
};

export const getTeamsFromFirebase = async () => {

	return new Promise((resolve, reject) => {
		onValue(teamsRef, (snapshot) => {
			const teams = snapshot.val();
			resolve(teams);
		}, (error) => {
			reject(error);
		});
	});
};
