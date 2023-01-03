function goToHomePage() {
  window.location.href = "home.html";
}

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
