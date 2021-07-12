const eventsNode = require("./events/events_node");

let wallpapers = [];
let endIndex = 2;
let page = 0;

async function get_wallpaper_paths() {
    document.getElementById("wallpaper_grid").innerHTML = "";
    const category = document.getElementById("topic").value;
    const resolution = document.getElementById("resolution").value;
    const paths = await eventsNode.getWallpapersPaths(category, resolution);
    wallpapers = paths;
    for (let idx = 0; idx <= endIndex; idx++) {
        document.getElementById("wallpaper_grid").innerHTML += wallpapers[idx];   
    }
    
    page = 1;
    document.getElementById("page").innerText = `Page: ${page}`
}

module.exports = {
    get_wallpaper_paths: get_wallpaper_paths
}