const path = require('path');
const con = require('../connector/connector');

const connector = new con.Connector();

async function getWallpapersPaths(category, resolution) {
    let wallpaperDivs = [];
    let wallpapers = await connector.getWallpapers(category, resolution);

    for(let path of wallpapers) {
        wallpaperDivs.push(
            "Example text"
        );
    }

    return wallpaperDivs;
}


module.exports = {
    getWallpapersPaths: getWallpapersPaths
}