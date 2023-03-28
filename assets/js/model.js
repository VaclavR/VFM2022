import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, reverse, child, query, onValue, orderByChild, orderByValue, equalTo, startAt } from "firebase/database";
// import { players, teams } from "./data";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://vfm2023-e59bb-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// get reference to data in the database
const dbRef = ref(database);
const teamsRef = ref(database, 'teams');
const playersRef = ref(database, 'players');
// set(playersRef, players)

export const getPlayersFromFirebase = async (teamId) => {
  const playersQuery = query(
    playersRef, 
    orderByChild("teamId"), 
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
    console.log("Tým s ID", teamId, "neexistuje v databázi.");
  }
}

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
