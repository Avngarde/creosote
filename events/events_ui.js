const eventsNode = require("./events/events_node");
const prompt = require("./events//prompt");

let wallpapers = [];
let endIndex = 2;
let startIndex = 0;
let page = 0;

async function get_wallpaper_paths() {
    prompt.showLoading();
    document.getElementById("wallpaper_grid").innerHTML = "";
    const category = document.getElementById("topic").value;
    const resolution = document.getElementById("resolution").value;
    const paths = await eventsNode.getWallpapersPaths(category, resolution);
    wallpapers = paths;
    for (let idx = 0; idx <= 2; idx++) { // It takes only 3 wallpapers due to request limit of Wallhaven api
        document.getElementById("wallpaper_grid").innerHTML += wallpapers[idx];   
    }
    
    page = 1;
    document.getElementById("page").innerText = `Page: ${page}`;
    prompt.hideLoading();
}

async function change_page(next_page) {
    if (page == 0) {
        return;
    }

    prompt.showLoading();

    if (next_page == true) {
        if (endIndex == 23) {
            prompt.hideLoading();
            return;
        };
        document.getElementById("wallpaper_grid").innerHTML = "";
        page++;
        endIndex += 3;
        startIndex += 3;

        for (let idx = startIndex; idx <= endIndex; idx++) { // It takes only 3 wallpapers due to request limit of Wallhaven api
            document.getElementById("wallpaper_grid").innerHTML += wallpapers[idx];   
        }

        document.getElementById("page").innerText = `Page: ${page}`

    } else {
        if (startIndex == 0) {
            prompt.hideLoading();
            return;
        };
        document.getElementById("wallpaper_grid").innerHTML = "";
        page--;
        endIndex -= 3;
        startIndex -= 3;

        for (let idx = startIndex; idx <= endIndex; idx++) { // It takes only 3 wallpapers due to request limit of Wallhaven api
            document.getElementById("wallpaper_grid").innerHTML += wallpapers[idx];   
        }

        document.getElementById("page").innerText = `Page: ${page}`
    }

    prompt.hideLoading();
}

async function setWallpaper(path) {
    prompt.showLoading();
    await eventsNode.setNewWallpaper(path);
    prompt.hideLoading();
}

async function setDefaultWallpaper() {
    prompt.showLoading();
    await eventsNode.returnToDefault();
    prompt.hideLoading();
}