const fs = require("fs");
const path = require("path");

const PHOTO_ROOT = "photos";

function walk(dir) {
  let results = [];

  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });

  return results;
}

function run() {
  const files = walk(PHOTO_ROOT);

  const galleries = {};

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();

    if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

    const parts = file.split(path.sep);

    // photos/Groomsmen/IMG_001.jpg
    const category = parts[1];

    if (!galleries[category]) {
      galleries[category] = [];
    }

    galleries[category].push(file.replace("photos" + path.sep, ""));
  });

  fs.mkdirSync("data", { recursive: true });

  fs.writeFileSync(
    "data/galleries.json",
    JSON.stringify(galleries, null, 2)
  );

  console.log("Gallery generated successfully!");
  console.log(Object.keys(galleries));
}

run();