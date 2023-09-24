const {app, BrowserWindow } = require ('electron')

var createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 620
    })
  
    win.loadFile("index.html")
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})