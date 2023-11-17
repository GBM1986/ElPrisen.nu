async function fetchElprisData() {
    const apiUrl = 'https://www.elprisenligenu.dk/api/v1/prices/2023/10-31_DK2.json';
    const currentPriceElement = document.getElementById('currentPrice');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const data = await response.json();
        const currentDateTime = new Date();
        const currentData = findCurrentData(data, currentDateTime);

        if (currentData) {
            const currentPrice = currentData.DKK_per_kWh;
            currentPriceElement.textContent = `${currentPrice} KR`;
        } else {
            console.error('No data found for the current time.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function findCurrentData(data, currentDateTime) {
    return data.find(dataPoint => new Date(dataPoint.time_start) <= currentDateTime) || null;
}

async function fetchCurrentHourRange() {
    const currentHourElement = document.getElementById('currentTime');

    try {
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();
        const nextHour = (currentHour + 1) % 24;
        currentHourElement.textContent = `${currentHour}:00 - ${nextHour}:00`;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Initial function calls
fetchCurrentHourRange();
fetchElprisData();
