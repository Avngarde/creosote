const eventsNode = require("./events/events_node");


async function get_wallpaper_paths() {
    const category = document.getElementById("topic").value;
    const resolution = document.getElementById("resolution").value;
    const paths = await eventsNode.getWallpapersPaths(category, resolution);
    for (const path of paths) {
        document.getElementById("wallpaper_grid").innerHTML += path;
    }       
}

module.exports = {
    get_wallpaper_paths: get_wallpaper_paths
}