const btn = document.querySelector("button");
const img = document.querySelector("img");
const p = document.querySelector("p");
const slider = document.querySelectorAll("#slider div");

const imageSrc = [
  "assets/images/onboarding_2.png",
  "assets/images/onboarding_3.png",
];
const text = [
  "Your satisfaction is our number one periority",
  "Let's fulfill your fashion needs with shoearight now!",
];
const btnText = ["Next", "Get Started"];

let count = -1;

btn.addEventListener("click", () => {
  count += 1;
  if (count == imageSrc.length) {
    window.location.href = "login.html";
  }
  img.src = imageSrc[count];
  btn.innerText = btnText[count];
  p.innerText = text[count];
  slider[count].style.backgroundColor = "grey";
  slider[count+1].style.backgroundColor = "black";
});
