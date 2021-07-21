function showLoading() {
    document.getElementById("prompt").style = "visibility: visible;";
    document.getElementById("message").innerText = "LOADING...";
}

function hide() {
    document.getElementById("prompt").style = "visibility: hidden;";
}


module.exports = {
    hide: hide,
    showLoading: showLoading,
}