const form = document.getElementById("form");

function setError(id, message) {
  document.getElementById(id).innerText = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");
}

function togglePass(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

// BLOCK FUTURE DATE
document.getElementById("dob").max = new Date().toISOString().split("T")[0];

// AUTO AGE
const dobInput = document.getElementById("dob");
const ageInput = document.getElementById("age");

dobInput.addEventListener("change", () => {
  const dob = new Date(dobInput.value);
  const today = new Date();

  if (dob > today) {
    setError("dobError", "Future date not allowed");
    ageInput.value = "";
    return;
  }

  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < 10) {
    setError("dobError", "Minimum age is 10");
    ageInput.value = "";
  } else {
    setError("dobError", "");
    ageInput.value = age;
  }
});

// LIVE VALIDATION
document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", function () {

    this.classList.remove("valid", "invalid");

    if (this.value) {
      this.classList.add("valid");
    }

    if (this.id === "name" && !/^[A-Za-z ]*$/.test(this.value)) {
      setError("nameError", "Only letters allowed");
      this.classList.add("invalid");
    }

    if (this.id === "username" && !/^[A-Za-z0-9]*$/.test(this.value)) {
      setError("userError", "Only letters & numbers");
      this.classList.add("invalid");
    }

    if (this.id === "email" && this.value && !/^\S+@\S+\.\S+$/.test(this.value)) {
      setError("emailError", "Invalid email");
      this.classList.add("invalid");
    }

    if (this.id === "contact" && this.value && !/^\d{10}$/.test(this.value)) {
      setError("contactError", "Enter 10 digit number");
      this.classList.add("invalid");
    }

  });
});

// SUBMIT
form.addEventListener("submit", function(e) {
  e.preventDefault();
  clearErrors();

  const country = document.getElementById("country");
  const code = document.getElementById("code");
  const phone = document.getElementById("contact").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const gender = document.querySelector('input[name="g"]:checked');

  let valid = true;

  if (!country.value) {
    setError("countryError", "Select country");
    country.classList.add("invalid");
    valid = false;
  }

  if (!code.value) {
    setError("contactError", "Select code");
    code.classList.add("invalid");
    valid = false;
  }

  if (!/^\d{10}$/.test(phone)) {
    setError("contactError", "Invalid phone number");
    valid = false;
  }

  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@+\-]).{6,}$/.test(password)) {
    setError("passError", "Weak password");
    valid = false;
  }

  if (password !== confirm) {
    setError("confirmError", "Passwords not match");
    valid = false;
  }

  if (!gender) {
    setError("genderError", "Select gender");
    valid = false;
  }

  if (valid) {
    alert("Form Submitted Successfully 🚀");
    form.reset();
  }
});