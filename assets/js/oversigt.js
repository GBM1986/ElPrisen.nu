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

        // Display prices for the next 8 hours
        for (let i = 0; i < 8; i++) {
            const hour = (currentHour + i) % 24;
            const priceData = data.find(item => new Date(item.time_start).getHours() === hour);

            if (priceData) {
                const hourElement = document.getElementById(`time-${i}`);
                const priceElement = document.getElementById(`price-${i}`);

                if (hourElement && priceElement) {
                    hourElement.textContent = `kl. ${hour}:00`;
                    priceElement.textContent = `${priceData.DKK_per_kWh.toFixed(3)} kr`;
                }
            }
        }

        // Display lowest and highest prices
        const priceDataSlice = data.slice(currentHour);

        if (priceDataSlice.length > 0) {
            const lowestPrice = Math.min(...priceDataSlice.map(item => item.DKK_per_kWh));
            const highestPrice = Math.max(...priceDataSlice.map(item => item.DKK_per_kWh));

            document.getElementById('low-price').textContent = `${lowestPrice.toFixed(3)} KR`;
            document.getElementById('high-price').textContent = `${highestPrice.toFixed(3)} KR`;
        } else {
            console.error('No data found for the current time.');
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Call the function
fetchAndDisplayPriceData();
