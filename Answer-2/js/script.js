document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let img = new Image();
  let imgX = 0,
    imgY = 0,
    imgWidth = 0,
    imgHeight = 0;

  const imageUpload = document.getElementById('imageUpload');
  const uploadError = document.getElementById('uploadError');
  const canvasForm = document.getElementById('canvasForm');

  const canvasWidthInput = document.getElementById('canvasWidth');
  const canvasHeightInput = document.getElementById('canvasHeight');
  const changeCanvasSizeButton = document.getElementById('changeCanvasSize');
  const canvasError = document.getElementById('canvasError');
  const imageProperties = document.getElementById('imageProperties');
  const imageForm = document.getElementById('imageForm');
  const imageXInput = document.getElementById('imageX');
  const imageYInput = document.getElementById('imageY');
  const imageWidthInput = document.getElementById('imageWidth');
  const imageHeightInput = document.getElementById('imageHeight');
  const changeImageSizeButton = document.getElementById('changeImageSize');

  //   Handle image upload
  imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file.type.startsWith('image/')) {
      uploadError.textContent = 'Please upload a valid image file';
      uploadError.classList.remove('d-none');
      return;
    }
    uploadError.textContent = '';
    uploadError.classList.add('d-none');

    const reader = new FileReader();
    reader.onload = (e) => {
      img.onload = () => {
        imgX = 0;
        imgY = 0;
        imgWidth = img.width;
        imgHeight = img.height;

        if (imgWidth > canvas.width || imgHeight > canvas.height) {
          const aspectRatio = imgWidth / imgHeight;
          if (aspectRatio > 1) {
            imgWidth = canvas.width;
            imgHeight = canvas.width / aspectRatio;
          } else {
            imgHeight = canvas.height;
            imgWidth = canvas.height * aspectRatio;
          }
        }

        imageXInput.value = imgX;
        imageYInput.value = imgY;
        imageWidthInput.value = imgWidth;
        imageHeightInput.value = imgHeight;

        imageProperties.style.display = 'block';
        changeCanvasSizeButton.disabled = true;
        drawImage();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  //   Handle canvas size change
  changeCanvasSizeButton.addEventListener('click', () => {
    const newWidth = parseInt(canvasWidthInput.value);
    const newHeight = parseInt(canvasHeightInput.value);

    if (newWidth < 100 || newHeight < 100) {
      canvasError.textContent = 'Canvas size must be at least 100x100.';
      return;
    }
    canvasError.textContent = '';

    canvas.width = newWidth;
    canvas.height = newHeight;

    if (img.src) {
      if (imgWidth > canvas.width || imgHeight > canvas.height) {
        const aspectRatio = imgWidth / imgHeight;
        if (aspectRatio > 1) {
          imgWidth = canvas.width;
          imgHeight = canvas.width / aspectRatio;
        } else {
          imgHeight = canvas.height;
          imgWidth = canvas.height * aspectRatio;
        }

        imageWidthInput.value = imgWidth;
        imageHeightInput.value = imgHeight;
      }
      drawImage();
    }
  });

  //   Handle image properties change
  changeImageSizeButton.addEventListener('click', () => {
    imgX = parseInt(imageXInput.value);
    imgY = parseInt(imageYInput.value);
    imgWidth = parseInt(imageWidthInput.value);
    imgHeight = parseInt(imageHeightInput.value);

    drawImage();
  });

  function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
  }
});
