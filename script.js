//your JS code here. If required.
// const output = document.getElementById("output");
// const btn = document.getElementById("download-images-button");
const output = document.getElementById("output");
const error = document.getElementById("error");
const loading = document.getElementById("loading");
const imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = () => {
      reject(new Error(`Failed to download image: ${url}`));
    };

    img.src = url;
  });
}

function downloadImages() {
  // Reset the previous state
  output.innerHTML = "";
  error.textContent = "";

  // Show loading spinner
  loading.style.display = "block";

  Promise.all(imageUrls.map(downloadImage))
    .then(images => {
      // Display images only when all downloads succeed
      images.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      // Display the error message
      error.textContent = err.message;
    })
    .finally(() => {
      // Hide the loading spinner in both success and failure cases
      loading.style.display = "none";
    });
}

downloadImages();
