const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/products";

let allData = [];

const user = document.querySelector("#name");
user.innerHTML = localStorage.getItem("email");

const mainDivs = document.querySelectorAll(".mainNav div");
for (let mainDiv of mainDivs) {
  mainDiv.addEventListener("click", async () => {
    let brand = mainDiv.getAttribute("data-brand");
    const shoes = document.querySelector(".shoes");
    shoes.innerHTML = "";
    addToDOM(await getFilteredData(brand));
    for (let div of mainDivs) {
      div.style.backgroundColor = "white";
      div.style.color = "black";
    }
    mainDiv.style.backgroundColor = "black";
    mainDiv.style.color = "white";
  });
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

const getAllData = async () => {
  const response = await axios.get(BASE_URL);
  allData = response.data;
  console.log(allData);
  addToDOM(allData);
  return allData;
};

const getFilteredData = async (brand) => {
    let param;
    if(brand) {
        param = `?brand=${brand}`
    }
  const response = await axios.get(`${BASE_URL}${param ?? ""}`);
  return response.data;
};

const getSearchData = async (keyWord) => {
    const response = await axios.get(`${BASE_URL}?name=${keyWord}`);
    console.log(response.data);
    return response.data;
}

function addToDOM(data) {
  const shoes = document.querySelector(".shoes");
  for (let item of data) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="shoe" data-brand="${item.brand}">
        <img src="${item.imageUrl[0]}" alt="" />
      </div>
      <div class="text">
        <p class="shoeName">${item.name}</p>
        <p class="shoePrice">$ ${item.price}</p>
      </div>`;
    shoes.append(card);
  }
}

const catagories = document.querySelectorAll("#catagories > div");
for (let catagorie of catagories) {
  catagorie.addEventListener("click", async () => {
    let brand = catagorie.getAttribute("data-brand");
    const navBrands = document.querySelectorAll(`.mainNav div`);
    for (let navBrand of navBrands) {
      navBrand.style.backgroundColor = "white";
      navBrand.style.color = "black";
      if(navBrand.getAttribute("data-brand") === brand){
        navBrand.style.backgroundColor = "black";
        navBrand.style.color = "white";
      }
    }

    const shoes = document.querySelector(".shoes");
    shoes.innerHTML = "";
    addToDOM(await getFilteredData(brand));
  });
}

const searchValue = document.querySelector("#search input");
console.log(searchValue);
searchValue.addEventListener("input", async () => {
    console.log(searchValue.value);
    const shoes = document.querySelector(".shoes");
    shoes.innerHTML = "";
    addToDOM(await getSearchData(searchValue.value))
})

window.addEventListener("DOMContentLoaded", getAllData);
