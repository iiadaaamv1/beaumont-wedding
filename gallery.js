fetch("data/galleries.json")
  .then(res => res.json())
  .then(galleries => {

    const params = new URLSearchParams(window.location.search);
    const folder = params.get("folder");

    const images = galleries[folder];

    const grid = document.getElementById("photoGrid");

    images.forEach(imgPath => {

      const img = document.createElement("img");

      img.src = `photos/${imgPath.replace(/\\/g, "/")}`;
      img.loading = "lazy";

      img.onclick = () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      };

      grid.appendChild(img);
    });

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    if (lightbox) {
      lightbox.onclick = () => {
        lightbox.style.display = "none";
      };
    }

  });