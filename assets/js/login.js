const signinBtn = document.querySelector("button");
const email = document.querySelector("input[type=email]");
const password = document.querySelector("input[type=password]");

signinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);
  window.location.href = "home.html"
});
