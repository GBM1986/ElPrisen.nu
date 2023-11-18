// Define getPriceColor function
function getPriceColor(price) {
    if (price <= 0.192) {
        return "#00FF29";
    } else if (price <= 0.283) {
        return "#33FF00";
    } else if (price <= 0.343) {
        return "#B8FF22";
    } else if (price <= 0.434) {
        return "#EDFF23";
    } else if (price <= 0.524) {
        return "#FFD645";
    } else if (price <= 0.543) {
        return "#FF7A00";
    } else if (price <= 0.653) {
        return "#FF8717";
    } else if (price <= 0.7) {
        return "#FF4D00";
    } else {
        return "#FF0000"; 
    }
}

async function fetchAndDisplayPriceData() {
    try {
        // Fetch electricity price data
        const response = await fetch('https://www.elprisenligenu.dk/api/v1/prices/2023/10-31_DK2.json');

        if (!response.ok) {
            throw new Error('Failed to fetch data. Please try again later.');
        }

        const data = await response.json();
        console.log('Data fetched:', data);

        const currentHour = new Date().getHours();

        // Display prices for the next 24 hours
        const next24HoursData = data.filter(interval => new Date(interval.time_start).getTime() <= new Date().getTime() + 24 * 60 * 60 * 1000);

        document.getElementById("priceHistory").innerHTML = '';

        next24HoursData.forEach(interval => {
            const startTime = new Date(interval.time_start);
            const timeStr = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;

            const historyDiv = document.createElement("div");
            historyDiv.classList.add("priceInterval");

            const price = interval.DKK_per_kWh.toFixed(3);
            const color = getPriceColor(price);

            historyDiv.innerHTML = `<p>kl. ${timeStr}</p><p style="color: ${color}">${price} kr</p>`;

            document.getElementById("priceHistory").appendChild(historyDiv);
        });

        // Display lowest and highest prices
        const lowestPrice = Math.min(...next24HoursData.map(item => item.DKK_per_kWh));
        const highestPrice = Math.max(...next24HoursData.map(item => item.DKK_per_kWh));

        document.getElementById('low-price').textContent = `${lowestPrice.toFixed(3)} KR`;
        document.getElementById('high-price').textContent = `${highestPrice.toFixed(3)} KR`;
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Call the function
fetchAndDisplayPriceData();
