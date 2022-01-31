// export const getResizedImage = (imagePath, size) => {
//   if (imagePath.match) {
//     const image = imagePath.match(/media\/screenshots/)
//       ? imagePath.replace(
//           "media/screenshots",
//           `media/resize/${size}/-/screenshots`
//         )
//       : imagePath.replace("/media/games", `/media/resize/${size}/-/games/`);
//     return image;
//   }
//   return imagePath;
// };
export const getResizedImage = (imagePath, size) => {
  let image = imagePath;
  if (imagePath.match) {
    image = imagePath.match(/media\/screenshots/)
      ? imagePath.replace(
          "media/screenshots",
          `media/resize/${size}/-/screenshots`
        )
      : imagePath.replace("/media/games", `/media/resize/${size}/-/games/`);
  }
  return image;
};
