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
        id: selectedShipping.getAttribute("data-id")
    }

    shipping = JSON.stringify(shipping)
    localStorage.setItem("shipping", shipping)

    window.location.href = "checkout.html"

}

window.addEventListener("DOMContentLoaded", () => {
    let selected = localStorage.getItem("shipping");
    selected = JSON.parse(selected);
    if(selected) {
        const input = document.querySelector(`input[data-id="${selected.id}"]`);
        input.checked = true;
    }

})