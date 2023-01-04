const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/orders";

const icons = document.querySelectorAll("footer Div i");
for (let icon of icons) {
  icon.addEventListener("click", () => {
    for (let i of icons) {
      i.style.color = "grey";
    }
    icon.style.color = "black";
  });
}




