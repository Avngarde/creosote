const eventsNode = require("./events/events_node");

let wallpapers = [];
let endIndex = 2;
let startIndex = 0;
let page = 0;

async function get_wallpaper_paths() {
    document.getElementById("wallpaper_grid").innerHTML = "";
    const category = document.getElementById("topic").value;
    const resolution = document.getElementById("resolution").value;
    const paths = await eventsNode.getWallpapersPaths(category, resolution);
    wallpapers = paths;
    for (let idx = startIndex; idx <= endIndex; idx++) { // It takes only 3 wallpapers due to request limit of Wallhaven api
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
        await get_wallpaper_paths();
    } else {
        page--;
        await get_wallpaper_paths(page);
    }
}