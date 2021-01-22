const { app, BrowserWindow } = require("electron");

function createWindow(x, y, width, height) {
    const win = new BrowserWindow({
        width: width,
        height: height,
        x: x,
        y: y,
        frame: false,
        contextIsolation: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadFile("index.html");
    win.webContents.on("before-input-event", (event, input) => {
        let bounds = win.getBounds();
        if ((input.control || input.meta) && input.key.toLowerCase() === "d") {
            createWindowFramed(
                bounds.x + 10,
                bounds.y + 10,
                bounds.width,
                bounds.height
            );
            event.preventDefault();
        }
        if ((input.control || input.meta) && input.key.toLowerCase() === "i") {
            createWindow(bounds.x, bounds.y, bounds.width, bounds.height);
            event.preventDefault();
        }
        if ((input.control || input.meta) && input.key.toLowerCase() === "t") {
            createWindowFramed(bounds.x, bounds.y, bounds.width, bounds.height);
            win.close();
            event.preventDefault();
        }
        if ((input.control || input.meta) && input.key.toLowerCase() === "q") {
            win.close();
            event.preventDefault();
        }
    });
}

function createWindowFramed(x, y, width, height) {
    const win = new BrowserWindow({
        width: width,
        height: height,
        frame: true,
        x: x,
        y: y,
        contextIsolation: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadFile("index.html");
    win.webContents.on("before-input-event", (event, input) => {
        let bounds = win.getBounds();
        if ((input.control || input.meta) && input.key.toLowerCase() === "d") {
            createWindowFramed(
                bounds.x + 10,
                bounds.y + 10,
                bounds.width,
                bounds.height
            );
            event.preventDefault();
        }
        if ((input.control || input.meta) && input.key.toLowerCase() === "i") {
            createWindowFramed(bounds.x, bounds.y, bounds.width, bounds.height);
            event.preventDefault();
        }
        if ((input.control || input.meta) && input.key.toLowerCase() === "q") {
            win.close();
            event.preventDefault();
        }
        if ((input.control || input.meta) && input.key.toLowerCase() === "t") {
            createWindow(bounds.x, bounds.y, bounds.width, bounds.height);
            win.close();
            event.preventDefault();
        }
    });
}

app.whenReady().then(() => {
    const electron = require("electron");
    var screen = electron.screen.getPrimaryDisplay().size;
    console.log(screen);
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    var left = Math.round((screenWidth - 800) / 2);
    var top = Math.round((screenHeight - 300) / 2);
    createWindow(left, top, 500, 400);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
