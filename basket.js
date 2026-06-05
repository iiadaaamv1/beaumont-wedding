const basketList = document.getElementById("basketList");
const copyBasketBtn = document.getElementById("copyBasketBtn");
const clearBasketBtn = document.getElementById("clearBasketBtn");
const emailBasketBtn = document.getElementById("emailBasketBtn");

function getBasket() {
  return JSON.parse(localStorage.getItem("photoBasket")) || [];
}

function saveBasket(basket) {
  localStorage.setItem("photoBasket", JSON.stringify(basket));
  updateBasketCount();
}

function updateBasketCount() {
  const basket = getBasket();
  document.querySelectorAll(".basket-count").forEach(count => {
    count.textContent = basket.length;
  });
}

function normaliseItem(item) {
  if (typeof item === "string") {
    return {
      fileName: item,
      imagePath: ""
    };
  }

  return item;
}

function renderBasket() {
  const basket = getBasket().map(normaliseItem);

  basketList.innerHTML = "";

  if (basket.length === 0) {
    basketList.innerHTML = "<li>Your basket is empty.</li>";
    updateBasketCount();
    return;
  }

  basket.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "basket-item";

    const thumbHtml = item.imagePath
      ? `<img src="photos/${item.imagePath}" alt="${item.fileName}">`
      : `<div class="basket-placeholder">No preview</div>`;

    li.innerHTML = `
      <div class="basket-thumb">
        ${thumbHtml}
      </div>

      <div class="basket-details">
        <div class="basket-file">${item.fileName}</div>
      </div>

      <button class="remove-basket-item" data-index="${index}" type="button">
        Remove
      </button>
    `;

    basketList.appendChild(li);
  });

  document.querySelectorAll(".remove-basket-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const basket = getBasket().map(normaliseItem);

      basket.splice(index, 1);
      saveBasket(basket);
      renderBasket();
    });
  });

  updateBasketCount();
}

copyBasketBtn.addEventListener("click", () => {
  const basket = getBasket().map(normaliseItem);

  if (basket.length === 0) {
    alert("Your basket is empty.");
    return;
  }

  const list = basket.map(item => item.fileName).join("\n");

  navigator.clipboard.writeText(list);
  copyBasketBtn.textContent = "Copied ✓";
});

emailBasketBtn.addEventListener("click", () => {
  const basket = getBasket().map(normaliseItem);

  if (basket.length === 0) {
    alert("Your basket is empty.");
    return;
  }

  const subject = "Wedding HD Photo Request";

  const body = `Hi,

Please could we request high-quality versions of the following wedding photos:

${basket.map(item => item.fileName).join("\n")}

Thank you!`;

  const emailAddress = "adambeaumont1994@googlemail.com";

  window.location.href =
    `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

clearBasketBtn.addEventListener("click", () => {
  localStorage.removeItem("photoBasket");
  renderBasket();
});

renderBasket();