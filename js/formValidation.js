document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorDiv = document.getElementById("form-errors");

    form.addEventListener("submit", function (event) {
        let isValid = true;
        let messages = [];

        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const email = document.getElementById("email").value.trim();
        const dob = document.getElementById("dob").value.trim();
        const language = document.getElementById("language").value;
        const message = document.getElementById("message").value.trim();

        // Name Validation
        if (!/^[A-Za-z]+(\s[A-Za-z]+)+$/.test(name)) {
            isValid = false;
            messages.push("Please enter your first and last name.");
        }

        // Mobile Validation
        if (!/^\d{10,15}$/.test(mobile)) {
            isValid = false;
            messages.push("Mobile number must be 10 to 15 digits.");
        }

        // Email Validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isValid = false;
            messages.push("Please enter a valid email address.");
        }

        // Date of Birth Validation (must be 18 or older)
        if (dob === "") {
            isValid = false;
            messages.push("Please enter your date of birth.");
        } else {
            const dobDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - dobDate.getFullYear();
            const m = today.getMonth() - dobDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
                age--;
            }

            if (age < 18) {
                isValid = false;
                messages.push("You must be at least 18 years old.");
            }
        }

        // Language Validation
        if (language === "") {
            isValid = false;
            messages.push("Please select a preferred language.");
        }

        // Message Validation
        if (message.length < 10) {
            isValid = false;
            messages.push("Message should be at least 10 characters long.");
        }

        if (!isValid) {
            event.preventDefault();
            errorDiv.style.display = "block";
            errorDiv.innerHTML = messages.map(msg => `<p>• ${msg}</p>`).join('');
        } else {
            errorDiv.style.display = "none";
        }
    });
});