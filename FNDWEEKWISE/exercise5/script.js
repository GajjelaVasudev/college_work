document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const phone = document.getElementById("phone");
  const successMessage = document.querySelector(".success-message");

  // Helper: show error
  function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error");
    error.innerText = message;
    error.style.display = "block";
    input.classList.add("invalid");
    input.classList.remove("valid");
  }

  // Helper: show success
  function showSuccess(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error");
    error.style.display = "none";
    input.classList.add("valid");
    input.classList.remove("invalid");
  }

  // Fullname validation
  fullname.addEventListener("input", () => {
    if (fullname.value.trim() === "") {
      showError(fullname, "Full Name is required.");
    } else {
      showSuccess(fullname);
    }
  });

  // Email validation
  email.addEventListener("input", () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
      showError(email, "Please enter a valid email.");
    } else {
      showSuccess(email);
    }
  });

  // Password validation
  password.addEventListener("input", () => {
    const regex = /^(?=.*[!@#$%^&*])/; // at least one special char
    if (password.value.length < 6 || !regex.test(password.value)) {
      showError(password, "Password must be at least 6 chars & contain a special char.");
    } else {
      showSuccess(password);
    }
  });

  // Phone validation
  phone.addEventListener("input", () => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phone.value)) {
      showError(phone, "Phone must be 10 digits.");
    } else {
      showSuccess(phone);
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if all inputs are valid
    if (
      fullname.classList.contains("valid") &&
      email.classList.contains("valid") &&
      password.classList.contains("valid") &&
      phone.classList.contains("valid")
    ) {
      successMessage.style.display = "block";
      form.reset();

      // Reset input styles
      [fullname, email, password, phone].forEach((input) => {
        input.classList.remove("valid");
      });
    } else {
      successMessage.style.display = "none";
      alert("Please fill out all fields correctly before submitting!");
    }
  });
});
