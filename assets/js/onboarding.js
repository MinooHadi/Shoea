const show1 = document.querySelector(".show1");
const show2 = document.querySelector(".show2");

setTimeout(function () {
  show1.style.display = "none";
  show2.style.display = "block";
}, 2000);

show2.addEventListener("click", () => {
  if (localStorage.getItem("email")) {
    window.location.href = "home.html";
  } else {
    window.location.href = "getstart.html";
  }
});

