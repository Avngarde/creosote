function showLoading() {
    document.getElementById("prompt").style = "visibility: visible;";
}

function hideLoading() {
    document.getElementById("prompt").style = "visibility: hidden;";
}


module.exports = {
    hideLoading: hideLoading,
    showLoading: showLoading
}