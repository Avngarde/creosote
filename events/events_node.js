const con = require('../connector/connector');

const connector = new con.Connector();

async function getWallpapersPaths(category, resolution) {
    let wallpaperDivs = [];
    let wallpapers = await connector.getWallpapers(category, resolution);

    for(let path of wallpapers) {
        wallpaperDivs.push(
            `<div class="wallpaper">
                <img src="${path}" />
            </div>`
        );
    }

    return wallpaperDivs;
}


module.exports = {
    getWallpapersPaths: getWallpapersPaths
}