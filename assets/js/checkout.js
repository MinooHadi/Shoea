function showSelectedProduct() {
  let selectedProducts = localStorage.getItem("myCart");
  selectedProducts = JSON.parse(selectedProducts);
  console.log(selectedProducts);
  const shoes = document.querySelector("#shoes");
  let totalPrice = 0;
  for (let selectedProduct of selectedProducts) {
    let count;
    if (selectedProduct.productCount) {
      count = selectedProduct.productCount;
    } else {
      count = 1;
    }
    let card = document.createElement("div");
    card.id = "card";
    card.innerHTML = `<div id="image">
      <img src="${selectedProduct.imageUrl[0]}" alt="" />
    </div>
    <div id="text">
      <div id="shoeName">
        <h4>${selectedProduct.name}</h4>
      </div>
      <div id="ShoeColorSize">
        <p>${selectedProduct.selectedColor}</p>
        <p>${selectedProduct.selectedSize}</p>
      </div>
      <div id="shoePrice">
        <h4>$ ${selectedProduct.price}</h4>
        <div class="quantity">
          <input type="number" value="${count}" readonly />
        </div>
      </div>
    </div>`;

    shoes.append(card);
  }
}

function goToSelectAddress() {
  window.location.href = "shippingAddress.html"
}

window.addEventListener("DOMContentLoaded", showSelectedProduct);