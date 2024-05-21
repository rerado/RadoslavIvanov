// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the leaderboard node in Firebase
  const leaderboardRef = firebase.database().ref('leaderboard');
  
  // Function to update leaderboard UI
  function updateLeaderboard() {
    leaderboardRef.orderByChild('score').limitToLast(15).once('value', function(snapshot) {
      const leaderboard = document.getElementById('leaderboard');
      leaderboard.innerHTML = ''; // Clear the existing leaderboard
  
      snapshot.forEach(function(childSnapshot) {
        const scoreData = childSnapshot.val();
        const playerName = scoreData.name;
        const playerScore = scoreData.score;
  
        const listItem = document.createElement('li');
        listItem.textContent = `${playerName}: ${playerScore}`;
        leaderboard.appendChild(listItem);
      });
    });
  }
  
  // Function to record new score to Firebase
  function recordScore(playerName, playerScore) {
    // Push a new score entry to the database
    leaderboardRef.push({
      name: playerName,
      score: playerScore
    });
  }
  
  // Example usage:
  // When a player finishes a game and achieves a score, call recordScore
  recordScore('Player 1', 100);
  // Update the leaderboard
  updateLeaderboard();
  