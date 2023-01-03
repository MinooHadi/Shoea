const user = document.querySelector("#name");
user.innerHTML = localStorage.getItem("email");

const mainDivs = document.querySelectorAll(".mainNav div");
for(let mainDiv of mainDivs) {
    mainDiv.addEventListener("click", () => {
        for(let div of mainDivs){
            div.style.backgroundColor = "white";
            div.style.color = "black";
        }
        mainDiv.style.backgroundColor = "black";
        mainDiv.style.color = "white";
    })
}

const icons = document.querySelectorAll("footer Div i");
for(let icon of icons) {
    icon.addEventListener("click", () => {
        for(let i of icons){
            i.style.color = "grey"
        }
        icon.style.color = "black"
    })
}