const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/products";

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

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  let productId = params.get("id");
  let response = await axios.get(`${BASE_URL}/${productId}`);
  let data = response.data;
  console.log(data);

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
    <div>${data.size[0]}</div>
    <div>${data.size[1]}</div>
    <div>${data.size[2]}</div>
    <div>${data.size[3]}</div>
    <div>${data.size[4]}</div>
  </div>
</div>
<div id="color">
  <h3>color</h3>
  <div id="colors">
    <div style="background-color:${data.color[0]} ;"></div>
    <div style="background-color:${data.color[1]} ;"></div>
    <div style="background-color:${data.color[2]} ;"></div>
    <div style="background-color:${data.color[3]} ;"></div>
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
  <button>
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
