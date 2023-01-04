const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/products";

const arrow = document.querySelector("#left i");
arrow.addEventListener("click", () => {
  window.location.href = "home.html";
});

const getFavoriteData = async () => {
  const response = await axios.get(`${BASE_URL}?isFavorite=true`);
  addToDOM(response.data);
};

function addToDOM(allData) {
  let shoes = document.querySelector(".shoes");
  shoes.innerHTML = "";
  if(!allData.length){
    shoes.innerHTML = "The desired product was not found"
  }
  for (let data of allData) {
    const card = document.createElement("div");
    card.innerHTML = `<div id="image">
        <img src="${data.imageUrl[0]}" alt="" />
        <div id="icon">
          <i class="fa fa-heart"></i>
        </div>
      </div>
      <div id="text">
        <h4>${data.name}</h4>
        <div id="rate">
          <i class="fa fa-star-half-o"></i>
          <p>${data.rate}</p>
        </div>
        <h5>$${data.price}</h5>
      </div>`;

    shoes.append(card);
  }
}

const brands = document.querySelectorAll(".mainNav > div");
for (let brand of brands) {
  brand.addEventListener("click", async () => {
    for(let item of brands){
      item.style.backgroundColor = "white";
      item.style.color = "black";
    }
    brand.style.backgroundColor = "black";
    brand.style.color = "white";
    let data;
    let brandName = brand.getAttribute("data-brand");
    const response = await axios.get(`${BASE_URL}?isFavorite=true`);
    if (brandName) {
      data = response.data.filter((item) => item.brand == brandName.toLowerCase());
    } else {
      data = response.data
    }
    addToDOM(data);
  });
}

window.addEventListener("DOMContentLoaded", getFavoriteData);
