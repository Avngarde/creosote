const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 800,
    minHeight: 600,
    minWidth: 800,
  });

  mainWindow.loadFile("index.html");
}

app.on("ready", () => {
  if (!fs.existsSync("./temp")) {
    fs.mkdirSync("./temp");
  }

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
