fetch("data/galleries.json")
  .then(res => res.json())
  .then(galleries => {

    const container = document.getElementById("gallery-grid");

const titles = {
  bridesmaids: "Bridesmaids",
  "best-men": "Groomsmen",
  ceremony: "Ceremony",
  reception: "Reception",
  "getting-ready": "Getting Ready",
  family: "Family",
  "lucy-adam": "Lucy & Adam",
  "post-ceremony": "Post-Ceremony",
  "pre-ceremony": "Pre-Ceremony",
  "wedding-breakfast": "Wedding Breakfast",
  all: "All Photos"
};
    Object.keys(galleries).forEach(category => {

      const card = document.createElement("a");

      card.href = `gallery.html?folder=${encodeURIComponent(category)}`;

      const firstImage = galleries[category][0];

      card.innerHTML = `
  <img src="photos/${firstImage.replace(/\\/g, "/")}" loading="lazy">
  <h2>${titles[category.toLowerCase()] || category}</h2>
`;

      container.appendChild(card);
    });

  });