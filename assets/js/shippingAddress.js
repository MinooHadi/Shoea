const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/address";

const getAddress = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const createDOM = async () => {
  const address = document.querySelector("#address");
  const data = await getAddress();
  for (let item of data) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="location">
        <i class="fa fa-map-marker"></i>
      </div>
      <div class="addressText">
        <h4>${item.title}</h4>
        <p>${item.address}</p>
      </div>
      <div>
        <input type="checkbox" ${item.selected ? "checked" : ""} />
      </div>`;

      address.insertAdjacentElement("beforebegin", card)
  }
};

function goToCheckout() {
    window.location.href = "checkout.html"
}

window.addEventListener("DOMContentLoaded", createDOM);
