const wallpaper = require('wallpaper');


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
    }
}


module.exports = {
    Wallpaper: Wallpaper
}