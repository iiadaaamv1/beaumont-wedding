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

    function cleanPath(path) {
      return path.replace(/\\/g, "/");
    }

    function getFileName(path) {
      return cleanPath(path).split("/").pop();
    }

    function openLightbox(index) {
      currentIndex = index;

      const imagePath = cleanPath(images[currentIndex]);

      lightboxImg.src = `photos/${imagePath}`;
      imageName.textContent = getFileName(imagePath);

      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }

    function showPrevious() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    }

    images.forEach((imgPath, index) => {
      const cleanImagePath = cleanPath(imgPath);

      const img = document.createElement("img");
      img.src = `photos/${cleanImagePath}`;
      img.loading = "lazy";
      img.alt = getFileName(cleanImagePath);

      img.addEventListener("click", () => {
        openLightbox(index);
      });

      grid.appendChild(img);
    });

    prevBtn.addEventListener("click", event => {
  event.stopPropagation();
  showPrevious();
});

nextBtn.addEventListener("click", event => {
  event.stopPropagation();
  showNext();
});

closeBtn.addEventListener("click", event => {
  event.stopPropagation();
  closeLightbox();
});

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", event => {
      if (lightbox.style.display !== "flex") return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    });
  });