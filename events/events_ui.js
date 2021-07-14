const eventsNode = require("./events/events_node");

let wallpapers = [];
let endIndex = 2;
let page = 0;

async function get_wallpaper_paths(choosen_page) {
    document.getElementById("wallpaper_grid").innerHTML = "";
    const category = document.getElementById("topic").value;
    const resolution = document.getElementById("resolution").value;
    const paths = await eventsNode.getWallpapersPaths(category, resolution, choosen_page);
    wallpapers = paths;
    for (let idx = 0; idx <= endIndex; idx++) { // It takes only 3 wallpapers due to request limit of Wallhaven api
        document.getElementById("wallpaper_grid").innerHTML += wallpapers[idx];   
    }
    
    if (page == 0){
        page = 1;
    }
    document.getElementById("page").innerText = `Page: ${page}`
}

async function change_page(next_page) {
    if (page == 0) {
        return;
    }

    if (next_page == true) {
        page++;
        await get_wallpaper_paths(page);
    } else {
        page--;
        await get_wallpaper_paths(page);
    }
}

module.exports = {
    get_wallpaper_paths: get_wallpaper_paths
}