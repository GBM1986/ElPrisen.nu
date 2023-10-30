if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

function fetchDataAndDisplay() {
    // URL of the API
    const apiUrl = 'https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json';

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Find the data point for a specific time, for example, midnight (00:00)
            const time = '00:00';
            const currentPrice = data.find(entry => entry.time === time)?.prices.DK2;

            if (currentPrice !== undefined) {
                const currentPriceElement = document.getElementById('currentPrice');
                currentPriceElement.textContent = `Current Price (DK2) at ${time}: ${currentPrice} DKK per kWh`;
            } else {
                console.error(`No data found for time: ${time}`);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the function to fetch and display data
fetchDataAndDisplay();