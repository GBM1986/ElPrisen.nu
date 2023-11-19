async function fetchData(url, region) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data. Please try again later.');
        }

        const data = await response.json();
        console.log(`Data fetched for ${region}:`, data);

        // Add logic to update the UI with the fetched data for the selected region
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}