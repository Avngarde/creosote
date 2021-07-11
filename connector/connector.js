const fetch = require('node-fetch');
const fs = require('fs');

class Connector {
    #apiKey;

    constructor() {
        this.#apiKey = "<YOUR-WALLHAVEN-API-KEY>";
    }

    async getWallpapers(category, resolutions, page = 1) {
        let paths = [];
        let response = await fetch(`https://wallhaven.cc/api/v1/search?apikey=${this.#apiKey}&q=+${category}&atleast=${resolutions}&page=${page}&sorting=random`);
        let body = await response.json();
        for (let wallpaper of body["data"]) {
            paths.push(wallpaper["path"]);
        }
        
        return paths;
    }

    async downloadWallpaper(path) {
        if (!fs.existsSync('../temp/')) {
            fs.mkdirSync('../temp/');
        } else {
            fs.rmdirSync('../temp/', {recursive: true});
            fs.mkdirSync('../temp/');
        }

        await this.#download(path, `../temp/wallpaper.png`)
    }

    async #download(url, filename) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(filename, buffer, () => null);
    }
}

module.exports = {
    Connector: Connector
}