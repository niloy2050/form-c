const form = document.getElementById("form");
const status = document.getElementById("status");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let error = "";

  // USERNAME: letters + numbers only
  if (!/^[A-Za-z0-9]+$/.test(username)) {
    error += "Username can contain only letters and numbers<br>";
  }

  // STRONG PASSWORD
  let strongPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*]).{8,}$/;

  if (!strongPass.test(password)) {
    error += "Password must include uppercase, lowercase, number & symbol<br>";
  }

  // PASSWORD MATCH
  if (password !== confirmPassword) {
    error += "Passwords do not match<br>";
  }

  if (error) {
    status.style.color = "red";
    status.innerHTML = error;
    return;
  }

  status.style.color = "green";
  status.innerHTML = "Form submitted successfully 🚀";
});