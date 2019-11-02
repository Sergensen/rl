const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(imageSrc, pixelCrop, imageFile) {
  return new Promise(async resolve => {
          const image = await createImage(imageSrc)
          const img = document.getElementById("img");
          EXIF.getData(img,function(f) {
              var orientation = EXIF.getTag(this, "Orientation");
              console.log(orientation)
              
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              const safeArea = Math.min(image.width, image.height) * 2
        
              // set each dimensions to double largest dimension to allow for a safe area for the
              // image to rotate in without being clipped by canvas context
              canvas.width = safeArea
              canvas.height = safeArea
              ctx.save();
        
              // draw rotated image and store data.
              ctx.drawImage(
                  image,
                  safeArea / 2 - image.width * 0.5,
                  safeArea / 2 - image.height * 0.5
              )
              const data = ctx.getImageData(0, 0, safeArea, safeArea)
        
              // set canvas width to final desired crop size - this will clear existing context
              canvas.width = pixelCrop.width
              canvas.height = pixelCrop.height
        
              // paste generated rotate image with correct offsets for x,y crop values.
              ctx.putImageData(
                  data,
                  0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
                  0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
              )
        
              // As Base64 string
              const dataUrl = canvas.toDataURL('image/jpeg');
              //resolve(dataUrl);
        
              // As a blob
              canvas.toBlob(file => {
                  resolve(URL.createObjectURL(file))
              }, 'image/jpeg');
        });
    });
}


/*
EXIF.getData(file,function() {
    ctx.save();
    if (orientation) {
      if (orientation > 4) {
        can.width  = height; can.style.width  = styleHeight;
        can.height = width;  can.style.height = styleWidth;
      }
      switch (orientation) {
      case 2: ctx.translate(width, 0);     ctx.scale(-1,1); break;
      case 3: ctx.translate(width,height); ctx.rotate(Math.PI); break;
      case 4: ctx.translate(0,height);     ctx.scale(1,-1); break;
      case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
      case 6: ctx.rotate(0.5 * Math.PI);   ctx.translate(0,-height); break;
      case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(width,-height); ctx.scale(-1,1); break;
      case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-width,0); break;
      }
    }

*/