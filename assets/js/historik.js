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
    document.getElementById("currentDate").textContent = selectedDate.toLocaleDateString("da-DK");
    document.getElementById("selectedDate").textContent = selectedDate.toLocaleDateString("da-DK");

    const selectedDateDisplayed = document.getElementById("selectedDateDisplayed");
    selectedDateDisplayed.textContent = selectedDate.toLocaleDateString("da-DK");

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
}

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
        return "#FF0000"; // Additional color for prices over 0.7
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    getPriceData(currentDate);

    document.getElementById("datePicker").addEventListener("change", function () {
        getPriceData(new Date(this.value));
    });
});
