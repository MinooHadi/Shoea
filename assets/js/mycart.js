function minus() {
  const quantity = document.querySelector("#quantity input");
  if (+quantity.value > 0) {
    quantity.value = Number(quantity.value) - 1;
  }
}

function plus() {
  const quantity = document.querySelector("#quantity input");
  quantity.value = Number(quantity.value) + 1;
}

const icons = document.querySelectorAll("footer Div i");
for (let icon of icons) {
  icon.addEventListener("click", () => {
    for (let i of icons) {
      i.style.color = "grey";
    }
    icon.style.color = "black";
  });
}
