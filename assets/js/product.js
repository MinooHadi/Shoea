const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/products";
let product;

function goToHomePage() {
  window.location.href = "home.html";
}

function minus() {
  const quantity = document.querySelector("#quantity input");
  if (+quantity.value > 0) {
    quantity.value = Number(quantity.value) - 1;
  }
  product.productCount = quantity.value;
}

function plus() {
  const quantity = document.querySelector("#quantity input");
  quantity.value = Number(quantity.value) + 1;
  product.productCount = quantity.value;
}

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  let productId = params.get("id");
  let response = await axios.get(`${BASE_URL}/${productId}`);
  let data = response.data;
  product = data;

  let icon ;
  if(data.isFavorite) {
    icon = "fa fa-heart"
  } else {
    icon = "fa fa-heart-o"
  }

  let imageUrls = data.imageUrl;
  const slider = document.createElement("div");
  slider.id = "slider";
  for (let imageUrl of imageUrls) {
    let sliderDiv = document.createElement("div");
    slider.append(sliderDiv);

    sliderDiv.addEventListener("click", () => {
      const sliderDivs = document.querySelectorAll("#slider div");
      sliderDivs.forEach((item) => item.classList.remove("sliderDiv"));
      document.querySelector("#image img").src = imageUrl;
      sliderDiv.classList.add("sliderDiv");
    });
  }

  const topDiv = document.querySelector("#top");
  topDiv.innerHTML = `<div>
    <i class="fa fa-long-arrow-left" onclick="goToHomePage()"></i>
  </div>
  <div id="image">
    <img src="${imageUrls[0]}" alt="" />
  </div>`;

  topDiv.append(slider);

  const bottomDiv = document.querySelector("#bottom");
  bottomDiv.innerHTML = `<div id="name">
  <h2>${data.name}</h2>
  <i class="${icon}" onclick="toggleFavorite(event)" data-isFavorite="${Number(data.isFavorite)}"></i>
</div>
<div id="view">
  <i class="fa fa-star-half-o"></i>
  <p>${data.rate} (${data.reviews} reviews)</p>
</div>
<div class="hr"></div>
<div id="description">
  <h3>Description</h3>
  <p>${data.description}</p>
</div>
<div id="size">
  <h3>Size</h3>
  <div id="numbers">
    <div onclick="selectSize(event)">${data.size[0]}</div>
    <div onclick="selectSize(event)">${data.size[1]}</div>
    <div onclick="selectSize(event)">${data.size[2]}</div>
    <div onclick="selectSize(event)">${data.size[3]}</div>
    <div onclick="selectSize(event)">${data.size[4]}</div>
  </div>
</div>
<div id="color">
  <h3>color</h3>
  <div id="colors">
    <div style="background-color:${data.color[0]} ;" onclick="selectColor(event)"></div>
    <div style="background-color:${data.color[1]} ;" onclick="selectColor(event)"></div>
    <div style="background-color:${data.color[2]} ;" onclick="selectColor(event)"></div>
    <div style="background-color:${data.color[3]} ;" onclick="selectColor(event)"></div>
  </div>
</div>
<div id="quantity">
  <h3>Quantity</h3>
  <div>
    <i class="fa fa-minus" onclick="minus()"></i>
    <input type="number" value="1" readonly/>
    <i class="fa fa-plus" onclick="plus()"></i>
  </div>
</div>
<div class="hr"></div>
<div id="price">
  <div>
    <p>Total price</p>
    <h2>$${data.price}</h2>
  </div>
  <button onclick="addToCart()">
    <i class="fa fa-shopping-bag"></i>
    <h4>Add to Cart</h4>
  </button>
</div>`;
});

const toggleFavorite = async (e) => {
  const params = new URLSearchParams(window.location.search);
  let productId = params.get("id");
  let response = await axios.put(`${BASE_URL}/${productId}`, {isFavorite: !Number(e.target.getAttribute("data-isFavorite")) });
  if(response.status === 200){
    e.target.setAttribute("data-isFavorite", Number(response.data.isFavorite))
    if(response.data.isFavorite){
        e.target.classList.replace("fa-heart-o", "fa-heart");
    } else {
        e.target.classList.replace("fa-heart", "fa-heart-o");
    }
  }
};


function selectSize(e) {
  const size = document.querySelectorAll("#numbers div");
  size.forEach(item => item.classList.remove("selectedSize"));
  e.target.classList.add("selectedSize");
  product.selectedSize = e.target.innerText;
}

function selectColor(e) {
  const color = document.querySelectorAll("#colors div");
  color.forEach(item => item.classList.remove("selectedColor"));
  e.target.classList.add("selectedColor");
  product.selectedColor = e.target.style.backgroundColor;
}


function addToCart() {
  let selectedProduct = localStorage.getItem("myCart");
  selectedProduct = JSON.parse(selectedProduct);
  if(selectedProduct) {
    selectedProduct.push(product);
  } else {
    selectedProduct = [product];
  }
  selectedProduct = JSON.stringify(selectedProduct);
  localStorage.setItem("myCart", selectedProduct);

  window.location.href = "mycart.html"
}
