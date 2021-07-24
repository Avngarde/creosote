const con = require("../connector/connector");
const wall = require("../wallpaper/wallpaper");

const connector = new con.Connector();
const wallpaper = new wall.Wallpaper();
wallpaper.setDefault();

function checkIfResultsExist(wallpapers) {
  for (let wallpaper of wallpapers) {
    if (wallpaper !== undefined) {
      return true;
    }
  }

  return false;
}

async function getWallpapersPaths(category, resolution) {
  let wallpaperDivs = [];
  let wallpapers = await connector.getWallpapers(category, resolution);
  if (checkIfResultsExist(wallpapers)) {
    for (let path of wallpapers) {
      wallpaperDivs.push(
        `<div class="wallpaper">
                    <button onclick="setWallpaper('${path}')"><img src="${path}" /></button>
                </div>`
      );
    }
  } else {
    return null;
  }

  return wallpaperDivs;
}

async function setNewWallpaper(path) {
  await connector.downloadWallpaper(path);
  await wallpaper.setWallpaper("./temp/wallpaper.png");
}

async function returnToDefault() {
  await wallpaper.returnToDefault();
}

module.exports = {
  getWallpapersPaths: getWallpapersPaths,
  setNewWallpaper: setNewWallpaper,
  returnToDefault: returnToDefault,
};
