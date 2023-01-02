const signinBtn = document.querySelector("button");

signinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("input[type=email]").value;
  const password = document.querySelector("input[type=password]").value;
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
});
