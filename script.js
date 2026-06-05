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

      const rawImage = galleries[category][0];
const imagePath = rawImage ? rawImage.replace(/\\/g, "/") : "";

const displayTitle = titles[category] || category;

card.innerHTML = `
  <div class="card-image">
    <img src="photos/${imagePath.replace(/\\/g, "/")}" loading="lazy">
  </div>
  <h2>${titles[category] || category}</h2>
`;

      container.appendChild(card);
    });

  });
