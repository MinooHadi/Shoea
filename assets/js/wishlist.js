const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/products";

const arrow = document.querySelector("#left i");
arrow.addEventListener("click", () => {
  window.location.href = "home.html";
});

let allData = [];

const getFavoriteData = async () => {
  const response = await axios.get(`${BASE_URL}?isFavorite=true`);
  allData = response.data;
  let shoes = document.querySelector(".shoes");
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

    shoes.append(card)
  }
};

window.addEventListener("DOMContentLoaded", getFavoriteData);
