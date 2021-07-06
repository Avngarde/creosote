const fetch = require('node-fetch');
const fs = require('fs');

export class Connector {
    #apiKey;

    constructor() {
        this.#apiKey = "<YOUR-WALLHAVEN-API-KEY>";
    }

    async getWallpapers(category, resolutions, page = 2) {
        let paths = [];
        console.log(`https://wallhaven.cc/api/v1/search?apikey=${this.#apiKey}&q=+${category}&resolutions=${resolutions}&page=${page}&sorting=random`);
        let response = await fetch(`https://wallhaven.cc/api/v1/search?apikey=${this.#apiKey}&q=+${category}&resolutions=${resolutions}&page=${page}&sorting=random`);
        let body = await response.json();
        for (let wallpaper of body["data"]) {
            paths.push(wallpaper["path"]);
        }

        return paths;
    }

    async downloadWallpapers(paths) {
        if (!fs.existsSync('../temp/')) {
            fs.mkdirSync('../temp/');
        } else {
            fs.rmdirSync('../temp/');
            fs.mkdirSync('../temp/');
        }

        // Im doing 24 requests as Wallhaven always sends 24 wallpapers per page
        await Promise.all([ 
            this.#download(paths[0], '../temp/wallpaper1.png'),
            this.#download(paths[1], '../temp/wallpaper2.png'),
            this.#download(paths[2], '../temp/wallpaper3.png'),
            this.#download(paths[3], '../temp/wallpaper4.png'),
            this.#download(paths[4], '../temp/wallpaper5.png'),
            this.#download(paths[5], '../temp/wallpaper6.png'),
            this.#download(paths[6], '../temp/wallpaper7.png'),
            this.#download(paths[7], '../temp/wallpaper8.png'),
            this.#download(paths[8], '../temp/wallpaper9.png'),
            this.#download(paths[9], '../temp/wallpaper10.png'),
            this.#download(paths[10], '../temp/wallpaper11.png'),
            this.#download(paths[11], '../temp/wallpaper12.png'),
            this.#download(paths[12], '../temp/wallpaper13.png'),
            this.#download(paths[13], '../temp/wallpaper14.png'),
            this.#download(paths[14], '../temp/wallpaper15.png'),
            this.#download(paths[15], '../temp/wallpaper16.png'),
            this.#download(paths[16], '../temp/wallpaper17.png'),
            this.#download(paths[17], '../temp/wallpaper18.png'),
            this.#download(paths[18], '../temp/wallpaper19.png'),
            this.#download(paths[19], '../temp/wallpaper20.png'),
            this.#download(paths[20], '../temp/wallpaper21.png'),
            this.#download(paths[21], '../temp/wallpaper22.png'),
            this.#download(paths[22], '../temp/wallpaper23.png'),
            this.#download(paths[23], '../temp/wallpaper24.png'),
        ]);
    }

    async #download(url, filename) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(filename, buffer, () => null);
    }
}


(async () => {
    let con = new Connector();
    let paths = await con.getWallpapers("linux", "2560x1440");
    await con.downloadWallpapers(paths);
})();