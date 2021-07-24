const wallpaper = require("wallpaper");
const fs = require("fs");

class Wallpaper {
  #currentWallpaperPath;

  constructor() {
    this.#currentWallpaperPath = "";
  }

  async setWallpaper(path) {
    await wallpaper.set(path);
  }

  async returnToDefault() {
    await wallpaper.set(this.#currentWallpaperPath);
  }

  async setDefault() {
    this.#currentWallpaperPath = await wallpaper.get();
    fs.copyFileSync(this.#currentWallpaperPath, "./temp/default.png");
    this.#currentWallpaperPath = "./temp/default.png";
  }
}

module.exports = {
  Wallpaper: Wallpaper,
};
