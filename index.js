const originalImage = document.getElementById("originalImage");
const originalImageMetadata = document.getElementById("originalImageMetadata");
const transformedImage = document.getElementById("transformedImage");
const transformedImageMetadata = document.getElementById("transformedImageMetadata");
const uploaderProvider = document.getElementById("uploader-provider");
const formatButton = document.getElementById("formatButton")

uploaderProvider.addEventListener('upload-finish', handleUpload);
formatButton.addEventListener('click', changeFormat);

function handleUpload(event) {
  const newImage = event.detail[0];

  originalImage.text_src = newImage.cdnUrl;

  imgLoad(newImage.cdnUrl).then(function (response) {
    originalImage.src = window.URL.createObjectURL(response);

    renderImageMetadata(originalImageMetadata, response);
  }, function (Error) {
    console.log(Error);
  });
}

function imgLoad(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';

    request.onload = function () {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(new Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function () {
      reject(new Error('There was a network error.'));
    };

    request.send();
  });
}

function changeFormat(e) {
  e.preventDefault();
  originalImage.src;

  imgLoad(originalImage.text_src + '/-/format/jpeg/').then(function (response) {
    transformedImage.src = window.URL.createObjectURL(response);

    renderImageMetadata(transformedImageMetadata, response);
  })
}

function renderImageMetadata(imageElement, imageMetadata) {
  imageElement.insertAdjacentHTML(
    'beforeend',
    `
      <div>
        <p><strong>Type:</strong> ${imageMetadata.type}</p>
        <p><strong>Size:</strong> ${imageMetadata.size} bytes</p>
      </div>`
  );
}
