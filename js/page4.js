document.addEventListener("DOMContentLoaded", function () {
    const startPlanningBtn = document.getElementById("startPlanningBtn");
    const citySelect = document.getElementById("city-select");
    const servicesSection = document.getElementById("services-list");
    const cityWarning = document.getElementById("city-warning");
    const noCityMessages = document.querySelectorAll(".no-city-message"); // Select all messages

    function showNoCityMessages() {
        noCityMessages.forEach(msg => {
            msg.style.display = "block";
        });
    }

    function hideNoCityMessages() {
        noCityMessages.forEach(msg => {
            msg.style.display = "none";
        });
    }

    startPlanningBtn.addEventListener("click", function (event) {
        if (citySelect.value === "") {
            event.preventDefault();
            cityWarning.textContent = "Please select a city before proceeding.";
            showNoCityMessages();
        } else {
            cityWarning.textContent = "";
            hideNoCityMessages();
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    });

    citySelect.addEventListener("change", function () {
        if (citySelect.value === "") {
            cityWarning.textContent = "Please select a city.";
            showNoCityMessages();
        } else {
            cityWarning.textContent = "";
            hideNoCityMessages();
        }
    });
});
