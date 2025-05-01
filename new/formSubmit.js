// formSubmit.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const messageBox = document.getElementById("formMessage"); // placeholder for success/error messages

  // Function to fetch and display messages from the database
  function loadMessages() {
    fetch('http://localhost:3000/contact/messages')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("messagesContainer");
        container.innerHTML = ""; // clear previous messages

        if (data.length === 0) {
          container.innerHTML = "<p>No messages yet.</p>";
          return;
        }

        // Loop through and render each message
        data.forEach(msg => {
          const card = document.createElement("div");
          card.className = "message-card";
          card.innerHTML = `
            <p><strong>Name:</strong> ${msg.name}</p>
            <p><strong>Message:</strong> ${msg.message}</p>
          `;
          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Error loading messages:", error);
      });
  }

  // Load messages when the page is first loaded
  loadMessages();

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form values
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const mobile = document.querySelector("#mobile").value;
    const dob = document.querySelector("#dob").value;
    const language = document.querySelector("#language").value;

    const data = { name, email, message, gender, mobile, dob, language };

    // Send data to the server
    fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(result => {
      // Show success message instead of alert
      messageBox.textContent = "Message sent successfully!";
      messageBox.className = "form-message success";
      messageBox.style.display = "block";

      // Optional: hide message after 5 seconds
      setTimeout(() => {
        messageBox.style.display = "none";
      }, 5000);

      form.reset();      // Clear form inputs
      loadMessages();    // Reload updated messages
    })
    .catch(error => {
      console.error('Error:', error);

      // Show error message
      messageBox.textContent = "Something went wrong. Please try again.";
      messageBox.className = "form-message error";
      messageBox.style.display = "block";

      setTimeout(() => {
        messageBox.style.display = "none";
      }, 5000);
    });
  });
});
