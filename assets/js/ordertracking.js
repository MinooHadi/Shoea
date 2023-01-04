const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/orders";

window.addEventListener("DOMContentLoaded", async () => {
  let orderId = new URLSearchParams(window.location.search).get("id");

  const response = await axios.get(`${BASE_URL}/${orderId}`);

  const shoes = document.querySelector("#shoes");
  shoes.innerHTML = "";

  for (let data of response.data.products) {
    let card = document.createElement("div");
    card.id = "card";
    card.innerHTML = `<div id="image">
      <img src="${data.imageUrl[0]}" alt="" />
    </div>
    <div id="text">
      <div id="shoeName">
        <h4>${data.name}</h4>
      </div>
      <div id="ShoeColorSize">
        <p>color: <div style="background-color:${data.selectedColor}"></div></p>
        <p>size: ${data.selectedSize}</p>
      </div>
      <div id="shoePrice">
        <h4>$ ${data.price}</h4>
        <div class="quantity">
          <input type="number" value="${data.productCount}" readonly />
        </div>
      </div>
    </div>`;

    shoes.append(card);
  }
});

function goToOrder() {
    window.location.href = "order.html"
}
