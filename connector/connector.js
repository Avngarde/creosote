const fetch = require('node-fetch');

export class Connector {
    #apiKey;

    constructor() {
        this.#apiKey = "<YOUR-WALLHAVEN-API-KEY>";
    }

    async getWallpapers(categories, resolutions, page = 1) {
        let paths = [];
        let response = await fetch(`https://wallhaven.cc/api/v1/search?apikey=${this.#apiKey}&categories=${categories}&resolutions=${resolutions}&page=${page}`);
        let body = await response.json();
        for (let wallpaper of body["data"]) {
            paths.push(wallpaper["path"]);
        }

        return paths;
    }
}