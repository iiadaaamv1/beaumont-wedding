fetch("data/galleries.json")
  .then(res => res.json())
  .then(galleries => {

    const covers = {
      bridesmaids: "bridesmaids/L&A-225-2.jpg",
      "best-men": "best-men/L&A-136.jpg",
      ceremony: "ceremony/L&A-722.jpg",
      reception: "reception/L&A-465.jpg",
      "getting-ready": "getting-ready/L&A-274.jpg",
      family: "family/L&A-255-2.jpg",
      "lucy-adam": "lucy-adam/L&A-564.jpg",
      "post-ceremony": "post-ceremony/L&A-058-2.jpg",
      "pre-ceremony": "pre-ceremony/L&A-090.jpg",
      "wedding-breakfast": "wedding-breakfast/L&A-357-2.jpg",
      all: "all/L&A-001-2.jpg"
    };

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

    const container = document.getElementById("gallery-grid");

const galleryOrder = [
  "all",
  "getting-ready",
  "pre-ceremony",
  "ceremony",
  "post-ceremony",
  "wedding-breakfast",
  "reception",
  "family",
  "best-men",
  "bridesmaids",
  "lucy-adam", 
];

galleryOrder.forEach(category => {      const card = document.createElement("a");
      card.className = "gallery-card";
      card.href = `gallery.html?folder=${encodeURIComponent(category)}`;

      const coverImage = covers[category] || galleries[category][0];
      const cleanCoverImage = coverImage.replace(/\\/g, "/");

      card.innerHTML = `
        <div class="card-image">
          <img src="photos/${cleanCoverImage}" loading="lazy">
        </div>
        <h2>${titles[category] || category}</h2>
      `;

      container.appendChild(card);
    });

  });