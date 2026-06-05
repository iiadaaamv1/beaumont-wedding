fetch("data/galleries.json")
  .then(res => res.json())
  .then(galleries => {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get("folder");

    const images = galleries[folder];

    const grid = document.getElementById("photoGrid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const imageName = document.getElementById("imageName");
    const closeBtn = document.getElementById("closeBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const addToBasketBtn = document.getElementById("addToBasketBtn");
    let currentIndex = 0;

    function cleanPath(filePath) {
      return filePath.replace(/\\/g, "/");
    }

    function getFileName(filePath) {
      return cleanPath(filePath).split("/").pop();
    }

    function showImage(index) {
      currentIndex = index;

      const imagePath = cleanPath(images[currentIndex]);

      lightboxImg.src = `photos/${imagePath}`;
      imageName.textContent = getFileName(imagePath);
const basket = getBasket();
const fileName = getFileName(imagePath);

if (basket.includes(fileName)) {
  addToBasketBtn.textContent = "Added ✓";
} else {
  addToBasketBtn.textContent = "Add to HD request basket";
}
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function showPrevious() {
      showImage((currentIndex - 1 + images.length) % images.length);
    }

    function showNext() {
      showImage((currentIndex + 1) % images.length);
    }

function getBasket() {
  return JSON.parse(localStorage.getItem("photoBasket")) || [];
}

function saveBasket(basket) {
  localStorage.setItem("photoBasket", JSON.stringify(basket));
}

addToBasketBtn.addEventListener("click", () => {
  const fileName = getFileName(images[currentIndex]);
  const basket = getBasket();

  if (!basket.includes(fileName)) {
    basket.push(fileName);
    saveBasket(basket);
  }

  addToBasketBtn.textContent = "Added ✓";
});
    images.forEach((imgPath, index) => {
      const cleanImagePath = cleanPath(imgPath);

      const img = document.createElement("img");
      img.src = `photos/${cleanImagePath}`;
      img.loading = "lazy";
      img.alt = getFileName(cleanImagePath);
if (img.complete) {
  img.classList.add("loaded");
} else {
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });
}
      img.addEventListener("click", () => {
        showImage(index);
      });

      grid.appendChild(img);
    });

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", showPrevious);
    nextBtn.addEventListener("click", showNext);

    document.addEventListener("keydown", event => {
      if (!lightbox.classList.contains("active")) return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    });
  });