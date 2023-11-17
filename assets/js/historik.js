function getPriceData(selectedDate) {
    const electricityClass = 'DK2';
    const formattedDate = `${selectedDate.getFullYear()}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

    fetch(`https://www.elprisenligenu.dk/api/v1/prices/${formattedDate}_${electricityClass}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then(data => displayData(selectedDate, data))
        .catch(error => console.error("Error:", error));
}

function displayData(selectedDate, data) {
    console.log(data);

    if (!data || !data.length) {
        console.error("No data available");
        return;
    }

    const next24HoursData = data.filter(interval => new Date(interval.time_start).getTime() <= new Date().getTime() + 24 * 60 * 60 * 1000);

    document.getElementById("priceHistory").innerHTML = '';
    document.getElementById("currentDate").textContent = selectedDate.toLocaleDateString("en-US");
    document.getElementById("selectedDate").textContent = selectedDate.toLocaleDateString("en-US");

    next24HoursData.forEach(interval => {
        const startTime = new Date(interval.time_start);
        const timeStr = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;

        const historyDiv = document.createElement("div");
        historyDiv.classList.add("priceInterval");

        historyDiv.innerHTML = `<p>Time: ${timeStr}</p><p>Price: ${interval.DKK_per_kWh.toFixed(3)} kr</p>`;

        document.getElementById("priceHistory").appendChild(historyDiv);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    getPriceData(currentDate);

    document.getElementById("datePicker").addEventListener("change", function () {
        getPriceData(new Date(this.value));
    });
});
