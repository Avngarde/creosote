const fetch = require('node-fetch');
const fs = require('fs');

class Connector {
    #apiKey;

    constructor() {
        this.#apiKey = "";
    }

    async getWallpapers(category, resolutions) {
        let paths = [];
        let response = await fetch(`https://wallhaven.cc/api/v1/search?apikey=${this.#apiKey}&q=+${category}&atleast=${resolutions}&sorting=random`);
        let body = await response.json();
        for (let wallpaper of body["data"]) {
            paths.push(wallpaper["path"]);
        }
        
        return paths;
    }

    async downloadWallpaper(path) {
        if (!fs.existsSync('./temp/')) {
            fs.mkdirSync('./temp/');
        } else {
            await fs.rmdir('./temp/', () => {});
            await fs.mkdir('./temp/', () => {});
        }

        await this.#download(path, `./temp/wallpaper.png`)
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