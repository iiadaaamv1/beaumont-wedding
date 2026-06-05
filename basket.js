const basketList = document.getElementById("basketList");
const copyBasketBtn = document.getElementById("copyBasketBtn");
const clearBasketBtn = document.getElementById("clearBasketBtn");

function getBasket() {
  return JSON.parse(localStorage.getItem("photoBasket")) || [];
}

function saveBasket(basket) {
  localStorage.setItem("photoBasket", JSON.stringify(basket));
}

function renderBasket() {
  const basket = getBasket();

  basketList.innerHTML = "";

  if (basket.length === 0) {
    basketList.innerHTML = "<li>Your basket is empty.</li>";
    return;
  }

  basket.forEach(fileName => {
    const li = document.createElement("li");
    li.textContent = fileName;
    basketList.appendChild(li);
  });
}

copyBasketBtn.addEventListener("click", () => {
  const basket = getBasket();

  if (basket.length === 0) {
    alert("Your basket is empty.");
    return;
  }

  navigator.clipboard.writeText(basket.join("\n"));
  copyBasketBtn.textContent = "Copied ✓";
});

clearBasketBtn.addEventListener("click", () => {
  localStorage.removeItem("photoBasket");
  renderBasket();
});

renderBasket();