import EXIF from 'exif-js';

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
export default async function getCroppedImg(imageSrc, crop, windowOrientation) {
  return new Promise(async resolve => {
          const image = await createImage(imageSrc)
          const img = document.getElementById("img");
          EXIF.getData(img, function() {
              const orientation = EXIF.getTag(this, "Orientation");
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              const scaleX = image.naturalWidth / image.width;
              const scaleY = image.naturalHeight / image.height;
              canvas.width = crop.width;
              canvas.height = crop.height;
              
              let deg = 0;
              if (orientation) {
                switch (orientation) {
                  case 8:
                    deg = 270;
                    break;
                  case 6:
                    deg = 90;
                    break;
                  case 3:
                    deg = 180;
                    break;
                  default:
                    deg = 0;
                }
              }

              let sx, sy, sw, sh, ow, oh; 
              if(window.innerHeight > window.innerWidth && (windowOrientation===0 || windowOrientation==="undefined")) {
                sx = crop.y * scaleY;
                sy = crop.x * scaleX;
                sw = crop.height * scaleY
                sh = crop.width * scaleX;
                ow = crop.height;
                oh = crop.width;
              } else if (window.innerHeight <= window.innerWidth || (window.innerHeight > window.innerWidth && windowOrientation !== 0 && windowOrientation !== "undefined")) {
                sx = crop.x * scaleX;
                sy = crop.y * scaleY;
                sw = crop.width * scaleX;
                sh = crop.height * scaleY;
                ow = crop.width;
                oh = crop.height;
              }

              ctx.drawImage(
                image,
                sx,
                sy,
                sw, 
                sh,
                0,
                0,
                ow, 
                oh
              );

              // As a blob
              canvas.toBlob(file => {
                resolve([URL.createObjectURL(file), deg])
              }, 'image/jpeg');
        });
    });
}


