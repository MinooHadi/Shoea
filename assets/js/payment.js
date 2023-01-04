const BASE_URL = "https://638e0461aefc455fb2b27d63.mockapi.io/orders";

function goToCheckout() {
  window.location.href = "checkout.html";
}

async function sendOrder() {
  let order = {
    products: JSON.parse(localStorage.getItem("myCart")),
    totalPrice: Number(localStorage.getItem("finalPrice")),
  };

  const response = await axios.post(BASE_URL, order);
  if(response.status == 201) {
    localStorage.removeItem("finalPrice");
    localStorage.removeItem("shipping");
    localStorage.removeItem("myCart");
    localStorage.removeItem("finalPrice");
    localStorage.removeItem("totalPrice");

    const successful = document.querySelector(".successful");
    successful.style.display = "flex";

    document.querySelector("#address").style.filter = "blur(5px)"
    document.querySelector("#navbar").style.filter = "blur(5px)"
    document.querySelector(".apply").style.filter = "blur(5px)"
  }
}


function gotoHome(e) {
    e.target.style.backgroundColor = "black";
    e.target.style.color = "white";
    window.location.href = "home.html"
}