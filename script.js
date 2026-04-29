const form = document.getElementById("form");

function setError(id, message) {
  document.getElementById(id).innerText = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");
}

// 👁 PASSWORD TOGGLE
function togglePass(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

// 🚫 BLOCK FUTURE DATE
document.getElementById("dob").max = new Date().toISOString().split("T")[0];

// 🎯 AUTO AGE
const dobInput = document.getElementById("dob");
const ageInput = document.getElementById("age");

dobInput.addEventListener("change", function () {
  const dob = new Date(this.value);
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

// ⚡ LIVE VALIDATION
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", function () {

    if (this.id === "name") {
      if (!/^[A-Za-z ]*$/.test(this.value)) {
        setError("nameError", "Only letters allowed");
      } else {
        setError("nameError", "");
      }
    }

    if (this.id === "username") {
      if (!/^[A-Za-z0-9]*$/.test(this.value)) {
        setError("userError", "Only letters & numbers");
      } else {
        setError("userError", "");
      }
    }

    if (this.id === "email") {
      if (this.value && !/^\S+@\S+\.\S+$/.test(this.value)) {
        setError("emailError", "Invalid email");
      } else {
        setError("emailError", "");
      }
    }

    if (this.id === "contact") {
      if (this.value && !/^\+[1-9]\d{9,14}$/.test(this.value)) {
        setError("contactError", "Use +91XXXXXXXXXX");
      } else {
        setError("contactError", "");
      }
    }

    if (this.id === "password") {
      if (this.value && !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@+\-]).{6,}$/.test(this.value)) {
        setError("passError", "Weak password");
      } else {
        setError("passError", "");
      }
    }

    if (this.id === "confirmPassword") {
      const pass = document.getElementById("password").value;
      if (this.value && this.value !== pass) {
        setError("confirmError", "Not matching");
      } else {
        setError("confirmError", "");
      }
    }

  });
});

// 🚀 SUBMIT
form.addEventListener("submit", function(e) {
  e.preventDefault();
  clearErrors();

  const gender = document.querySelector('input[name="g"]:checked');

  if (!gender) {
    setError("genderError", "Select gender");
    return;
  }

  alert("Form submitted successfully 🚀");
  form.reset();
});