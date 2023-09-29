const { app, BrowserWindow, Menu } = require('electron');
const createWindow = (fileName, w , h) => {
    const win = new BrowserWindow({width: w||850, heaight: h||620})
  
    win.loadFile(fileName);
}

app.whenReady().then(() => {
    createWindow("index.html")
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})

const menuItems = [
    {
        label : "About", click: ()=>{createWindow("about.html", 500, 500)}
    }
]
const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);