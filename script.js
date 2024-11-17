// Define API URL and Key
const apiKey = "e8511e56-f03f-45ab-99ff-6feffdb43be7";
const apiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}`;

// Fetch and display match details
async function fetchMatchDetails() {
    const matchInfoDiv = document.getElementById("match-info");
    try {
        matchInfoDiv.innerHTML = "<p class='loading'>Fetching live scores...</p>";
        
        // Fetch data from API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if matches are available
        if (data && data.data && data.data.length > 0) {
            const match = data.data[0]; // Display the first match
            matchInfoDiv.innerHTML = `
                <p><strong>Match:</strong> ${match.name}</p>
                <p><strong>Teams:</strong> ${match.teams[0]} vs ${match.teams[1]}</p>
                <p><strong>Score:</strong> ${match.score[0]?.inning}: ${match.score[0]?.runs}/${match.score[0]?.wickets} (Overs: ${match.score[0]?.overs})</p>
                <p><strong>Status:</strong> ${match.status}</p>
            `;
        } else {
            matchInfoDiv.innerHTML = "<p>No live matches at the moment.</p>";
        }
    } catch (error) {
        console.error("Error fetching match details:", error);
        matchInfoDiv.innerHTML = "<p>Error loading match details. Please try again later.</p>";
    }
}

// Initialize fetch
fetchMatchDetails();
