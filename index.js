const originalImage = document.getElementById("originalImage");
const originalImageMetadata = document.getElementById("originalImageMetadata");

const transformedImage = document.getElementById("transformedImage");
const transformedImageMetadata = document.getElementById("transformedImageMetadata");

document.getElementById("kek").addEventListener('upload-finish', renderImageMetadata);
document.getElementById("format").addEventListener('click', changeFormat)

function renderImageMetadata(event) {
  console.log(event.detail)

  var newImage = event.detail[0];

  // const type = newImage.imageInfo.format;
  // const size = newImage.size;

  originalImage.text_src = newImage.cdnUrl;

  imgLoad(newImage.cdnUrl).then(function (response) {
    originalImage.src = window.URL.createObjectURL(response);

    originalImageMetadata.insertAdjacentHTML(
      'beforeend',
      `
      <div>
        <p><strong>Type:</strong> ${response.type}</p>
        <p><strong>Size:</strong> ${response.size} bytes</p>
      </div>`
    );

    window.lol = response;
  }, function (Error) {
    console.log(Error);
  });

}


function imgLoad(url) {
  'use strict';
  // Create new promise with the Promise() constructor;
  // This has as its argument a function with two parameters, resolve and reject
  return new Promise(function (resolve, reject) {
    // Standard XHR to load an image
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';

    // When the request loads, check whether it was successful
    request.onload = function () {
      if (request.status === 200) {
        // If successful, resolve the promise by passing back the request response
        resolve(request.response);
      } else {
        // If it fails, reject the promise with a error message
        reject(new Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function () {
      // Also deal with the case when the entire request fails to begin with
      // This is probably a network error, so reject the promise with an appropriate message
      reject(new Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}


function changeFormat(e) {
  e.preventDefault();
  originalImage.src
  imgLoad(originalImage.text_src + '/-/format/jpeg/').then(function (response) {
    transformedImage.src = window.URL.createObjectURL(response);

    transformedImageMetadata.insertAdjacentHTML(
      'beforeend',
      `
      <div>
        <p><strong>Type:</strong> ${response.type}</p>
        <p><strong>Size:</strong> ${response.size} bytes</p>
      </div>`
    );
  })
}