const https = require("https"); // or 'https' for https:// URLs
const path = require("path");
const fs = require("fs");

const images = require("./pizza-images").slice(368);

(async function () {
  for (let index = 0; index < images.length; index++) {
    const element = images[index];
    console.info(`🔥 index`, index, element);
    await fetchAndSaveImage(element);
  }
})();

// images.forEach(async (imageUrl) => {
//   await fetchAndSaveImage(imageUrl);
// });

function fetchAndSaveImage(url) {
  const fileName = path.basename(url);
  const file = fs.createWriteStream(path.join("images", fileName));

  return new Promise((res) => {
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log("Download Completed:", url);
          res();
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  });
}
