function goToCheckout() {
    window.location.href = "checkout.html"
}

function chooseShipping() {
    const selectedShipping = document.querySelector("input:checked");
    let data = selectedShipping.parentElement.parentElement;
    let shipping = {
        shippingIcon: data.querySelector("i").className,
        shippingName: data.querySelector(".addressText h4").innerText,
        shippingPrice: data.querySelector(".price span").innerText,
    }

    shipping = JSON.stringify(shipping)
    localStorage.setItem("shipping", shipping)

    window.location.href = "checkout.html"

}