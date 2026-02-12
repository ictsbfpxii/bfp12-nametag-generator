// cropImageHelper.ts
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the image (which is already transparent)
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(URL.createObjectURL(blob));
    }, "image/png"); // <--- PNG to keep transparency
  });
}

// cropImageHelper.ts

// export const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));
//     image.setAttribute("crossOrigin", "anonymous");
//     image.src = url;
//   });

// export interface Area {
//   width: number;
//   height: number;
//   x: number;
//   y: number;
// }

// export default async function getCroppedImg(
//   imageSrc: string,
//   pixelCrop: Area,
// ): Promise<string> {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     throw new Error("No 2d context");
//   }

//   // Set canvas size to the cropped size
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   // Draw the cropped image onto the canvas
//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height,
//   );

//   // Return the result as a URL
//   return new Promise((resolve, reject) => {
//     canvas.toBlob((blob) => {
//       if (!blob) {
//         reject(new Error("Canvas is empty"));
//         return;
//       }
//       resolve(URL.createObjectURL(blob));
//     }, "image/jpeg");
//   });
// }

// // cropImageHelper.ts

// export const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));
//     // prevent CORS errors if images are from a different domain
//     image.setAttribute("crossOrigin", "anonymous");
//     image.src = url;
//   });

// export interface Area {
//   width: number;
//   height: number;
//   x: number;
//   y: number;
// }

// /**
//  * This function returns the Cropped Image as a Blob URL (e.g. "blob:http://...")
//  */
// export default async function getCroppedImg(
//   imageSrc: string,
//   pixelCrop: Area,
// ): Promise<string> {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     throw new Error("No 2d context");
//   }

//   // Set canvas size to the size of the crop
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   // Draw the image onto the canvas, but only the cropped part
//   ctx.drawImage(
//     image,
//     pixelCrop.x, // Start X on original image
//     pixelCrop.y, // Start Y on original image
//     pixelCrop.width, // Width to crop
//     pixelCrop.height, // Height to crop
//     0, // Place at 0,0 on canvas
//     0,
//     pixelCrop.width, // Draw width
//     pixelCrop.height, // Draw height
//   );

//   // Convert the canvas to a Blob URL
//   return new Promise((resolve, reject) => {
//     canvas.toBlob((blob) => {
//       if (!blob) {
//         reject(new Error("Canvas is empty"));
//         return;
//       }
//       resolve(URL.createObjectURL(blob));
//     }, "image/jpeg");
//   });
// }

// cropImageHelper.ts

//remove.bg API KEY - sarrPXcS4zDakkhUmKyxoHJN

// export const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));
//     image.setAttribute("crossOrigin", "anonymous");
//     image.src = url;
//   });

// export interface Area {
//   width: number;
//   height: number;
//   x: number;
//   y: number;
// }

// export default async function getCroppedImg(
//   imageSrc: string,
//   pixelCrop: Area,
//   removeBackground: boolean = false, // <--- New Flag
// ): Promise<string> {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     throw new Error("No 2d context");
//   }

//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   // 1. Draw the standard cropped image
//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height,
//   );

//   // 2. If requested, remove white background
//   if (removeBackground) {
//     // Get all pixel data (Red, Green, Blue, Alpha)
//     const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imgData.data;

//     // Loop through every pixel
//     for (let i = 0; i < data.length; i += 4) {
//       const r = data[i]; // Red
//       const g = data[i + 1]; // Green
//       const b = data[i + 2]; // Blue

//       // THRESHOLD: If pixel is very bright ( > 240 out of 255)
//       // We consider it "White"
//       if (r > 255 && g > 255 && b > 255) {
//         data[i + 3] = 0; // Set Alpha to 0 (Transparent)
//       }
//     }

//     // Put the modified pixels back onto the canvas
//     ctx.putImageData(imgData, 0, 0);
//   }

//   return new Promise((resolve, reject) => {
//     canvas.toBlob((blob) => {
//       if (!blob) {
//         reject(new Error("Canvas is empty"));
//         return;
//       }
//       resolve(URL.createObjectURL(blob));
//     }, "image/png"); // <--- MUST be PNG to support transparency
//   });
// }
