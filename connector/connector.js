const fetch = require('node-fetch');
const request = require('request');
const fs = require('fs');

export class Connector {
    #apiKey;

    constructor() {
        this.#apiKey = "<YOUR-WALLHAVEN-API-KEY>";
    }

    async getWallpapers(categories, resolutions, page = 1) {
        let paths = [];
        console.log(`https://wallhaven.cc/api/v1/search?apikey=${this.#apiKey}&categories=${categories}&resolutions=${resolutions}&page=${page}`);
        let response = await fetch(`https://wallhaven.cc/api/v1/search?apikey=${this.#apiKey}&categories=${categories}&resolutions=${resolutions}&page=${page}`);
        let body = await response.json();
        for (let wallpaper of body["data"]) {
            paths.push(wallpaper["path"]);
        }

        console.log(paths);
        return paths;
    }

    async downloadWallpapers(paths) {
        fs.existsSync("../temp/") ? null : fs.mkdir("../temp/");
        let file_id = 1;
        for (let path of paths) {
            await this.#download(path, `../temp/wallpaper${file_id}.png`);
            file_id = file_id + 1;
        }
    }

    async #download(uri, filename) {
        request.head(uri, function(err, res, body){
            request(uri).pipe(fs.createWriteStream(filename));
        })
    }
}


(async () => {
    let con = new Connector();
    let paths = await con.getWallpapers("anime", "1920x1080");
    await con.downloadWallpapers(paths);
})();