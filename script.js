fetch("data/galleries.json")
  .then(res => res.json())
  .then(galleries => {

    const container = document.getElementById("gallery-grid");

    Object.keys(galleries).forEach(category => {

      const card = document.createElement("a");

      card.href = `gallery.html?folder=${encodeURIComponent(category)}`;

      card.className = "gallery-card";

      const firstImage = galleries[category][0];

      card.innerHTML = `
        <img src="photos/${firstImage}" loading="lazy">
        <h2>${category}</h2>
      `;

      container.appendChild(card);
    });

  });