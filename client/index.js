const {app,BrowserWindow} = require("electron");



let mainWindow;
app.on("ready", ()=>{
    mainWindow = new BrowserWindow({
        webPrreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadURL(`${app.getAppPath()}\\build\\index.html`)
})


