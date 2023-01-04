function updatecount(id, count) {
  let products = localStorage.getItem("myCart");
  products = JSON.parse(products);
  for(let product of products){
    if(product.id == id){
      product.productCount = count;
    }
  }
  products = JSON.stringify(products);
  localStorage.setItem("myCart", products);
}

function minus(e, id) {
  let input = e.target.parentElement.querySelector("input");
  if (+input.value > 0) {
    input.value = Number(input.value) - 1;
  }
  updatecount(id, input.value);
}

function plus(e, id) {
  let input = e.target.parentElement.querySelector("input");
  input.value = Number(input.value) + 1;
  updatecount(id, input.value);
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
      <i class="fa fa-trash-o" onclick="deleteSelectedProduct(event)" data-id="${selectedProduct.id}"></i>
    </div>
    <div id="ShoeColorSize">
      <p>${selectedProduct.selectedColor}</p>
      <p>${selectedProduct.selectedSize}</p>
    </div>
    <div id="shoePrice">
      <h4>$ ${selectedProduct.price}</h4>
      <div class="quantity">
        <i class="fa fa-minus" onclick="minus(event, ${selectedProduct.id})"></i>
        <input type="number" value="${count}" readonly />
        <i class="fa fa-plus" onclick="plus(event, ${selectedProduct.id})"></i>
      </div>
    </div>
  </div>`;

    shoes.append(card);

    let price = selectedProduct.price * count;
    totalPrice += price;
  }

  const total = document.querySelector("#totalPrice #left h4");
  total.innerHTML = `$ ${totalPrice}.00`;

  localStorage.setItem("totalPrice", totalPrice);
}

function deleteSelectedProduct(e) {
  let deleteId = e.target.getAttribute("data-id");
  let products = localStorage.getItem("myCart");
  products = JSON.parse(products);
  products = products.filter((item) => item.id !== deleteId);
  products = JSON.stringify(products);
  localStorage.setItem("myCart", products);
  const shoes = document.querySelector("#shoes");
  shoes.innerHTML = "";
  showSelectedProduct();
}

function goToCheckoutPage() {
  window.location.href = "checkout.html"
}

window.addEventListener("DOMContentLoaded", showSelectedProduct);
