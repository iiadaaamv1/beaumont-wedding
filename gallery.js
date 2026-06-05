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

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

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

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function showPrevious() {
      const newIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(newIndex);
    }

    function showNext() {
      const newIndex = (currentIndex + 1) % images.length;
      showImage(newIndex);
    }

    images.forEach((imgPath, index) => {
      const cleanImagePath = cleanPath(imgPath);

      const img = document.createElement("img");
img.src = `photos/${cleanImagePath}`;
img.loading = "lazy";
img.alt = getFileName(cleanImagePath);


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
    lightbox.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].screenX;
});

let touchStartX = 0;
let touchStartY = 0;

lightboxImg.addEventListener("touchstart", event => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}, { passive: true });

lightboxImg.addEventListener("touchend", event => {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;

  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      showPrevious();
    } else {
      showNext();
    }
  }
}, { passive: true });
  });