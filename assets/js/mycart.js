function updatecount(id, count) {
  let products = localStorage.getItem("myCart");
  products = JSON.parse(products);
  let totalPrice = 0;
  for(let product of products){
    if(product.id == id){
      product.productCount = count;
    }
    totalPrice += product.price * product.productCount;
  }
  products = JSON.stringify(products);
  localStorage.setItem("myCart", products);
  localStorage.setItem("totalPrice", totalPrice);
  const total = document.querySelector("#totalPrice #left h4");
  total.innerHTML = `$ ${totalPrice}.00`;
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
  
  const shoes = document.querySelector("#shoes");

  if(!selectedProducts) {
    shoes.innerHTML = "No product has been selected"
    return
  }

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
      <p>color: <div style="background-color:${selectedProduct.selectedColor}"></div></p>
      <p>size: ${selectedProduct.selectedSize}</p>
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

let deleteId;

function deleteSelectedProduct(e) {
  const deleteModal = document.querySelector(".deleteModal");
  deleteModal.style.display = "flex";

  const shoes = document.querySelector("#shoes");
  shoes.style.filter = "blur(5px)";

  const navbar = document.querySelector("#navbar");
  navbar.style.filter = "blur(5px)"

  deleteId = e.target.getAttribute("data-id");
  let products = localStorage.getItem("myCart");
  products = JSON.parse(products)
  let data = products.find(item => item.id == deleteId);
  
  const card = document.querySelector(".card");
  card.innerHTML = `<div class="image">
  <img src="${data.imageUrl[0]}" alt="" />
</div>
<div class="text">
  <div class="shoeName">
    <h4>${data.name}</h4>
  </div>
  <div class="info">
    <p>color: <div style="background-color: ${data.selectedColor}"></div></p>
    <p>size: ${data.selectedSize}</p>
  </div>
  <div class="price">
    <h5>$ ${data.price}</h5>
    <div>
      <i class="fa fa-minus"></i>
      <p>${data.productCount}</p>
      <i class="fa fa-plus"></i>
    </div>
  </div>
</div>`
  
}

function cancel() {
  const deleteModal = document.querySelector(".deleteModal");
  deleteModal.style.display = "none";

  const shoes = document.querySelector("#shoes");
  shoes.style.filter = "none";

  const navbar = document.querySelector("#navbar");
  navbar.style.filter = "none"

  deleteId = null;
}

function deleteProduct() {
  let products = localStorage.getItem("myCart");
  products = JSON.parse(products);
  products = products.filter((item) => item.id !== deleteId);
  products = JSON.stringify(products);
  localStorage.setItem("myCart", products);
  const shoes = document.querySelector("#shoes");
  shoes.innerHTML = "";
  showSelectedProduct();
  cancel()
}

function goToCheckoutPage() {
  window.location.href = "checkout.html"
}

window.addEventListener("DOMContentLoaded", showSelectedProduct);
