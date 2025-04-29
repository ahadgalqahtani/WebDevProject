// formSubmit.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const mobile = document.querySelector("#mobile").value;
      const dob = document.querySelector("#dob").value;
      const language = document.querySelector("#language").value;
  
      const data = {
        name,
        email,
        message,
        gender,
        mobile,
        dob,
        language
      };
  
      // Use Fetch API to send data to the server
      fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.text())
      .then(result => {
        alert('Message sent successfully!');
        console.log(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
  