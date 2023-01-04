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

async function activeOrders() {
  const firstLink = document.querySelector(".link a:first-child");
  firstLink.classList.add("black");
  const lastLink = document.querySelector(".link a:last-child");
  lastLink.classList.remove("black");
  const response = await axios.get(`${BASE_URL}?status=false`);
  let data = response.data;
  const shoes = document.querySelector("#shoes");
  shoes.innerHTML = "";
  for (let item of data) {
    if (!item.products) {
      continue;
    }
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="image">
        <img src="${item.products[0].imageUrl[0]}" alt="">
    </div>
    <div class="text">
        <div class="shoeName">
            <h4>${item.products[0].name}</h4>
        </div>
        <div class="info">
        <p>color: <div style="background-color:${item.products[0].selectedColor}"></div></p>
        <p>size: ${item.products[0].selectedSize}</p>
        <p>qty: ${item.products[0].productCount}</p>
        </div>
        <div class="delivery">
            <p>In delivery</p>
        </div>
        <div class="price">
            <h5>$${item.products[0].price}</h5>
            <div>
                Track Order
            </div>
        </div>
    </div>`;

    shoes.append(card);
  }
}

async function complatedOrders() {
  const firstLink = document.querySelector(".link a:first-child");
  firstLink.classList.remove("black");
  const lastLink = document.querySelector(".link a:last-child");
  lastLink.classList.add("black");
  const response = await axios.get(`${BASE_URL}?status=true`);
  let data = response.data;
  const shoes = document.querySelector("#shoes");
  shoes.innerHTML = "";
  for (let item of data) {
    if (!item.products) {
      continue;
    }
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="image">
        <img src="${item.products[0].imageUrl[0]}" alt="">
    </div>
    <div class="text">
        <div class="shoeName">
            <h4>${item.products[0].name}</h4>
        </div>
        <div class="info">
            <p>color: <div style="background-color:${item.products[0].selectedColor}"></div></p>
            <p>size: ${item.products[0].selectedSize}</p>
            <p>qty: ${item.products[0].productCount}</p>
        </div>
        <div class="delivery">
            <p>Completed</p>
        </div>
        <div class="price">
            <h5>$${item.products[0].price}</h5>
            <div>
                Track Order
            </div>
        </div>
    </div>`;

    shoes.append(card);
  }
}

window.addEventListener("DOMContentLoaded", activeOrders);
