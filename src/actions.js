// https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
const {ipcMain} = require('electron')
//const c = require("./constants")

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})


ipcMain.on("add_catalog", (event, arg)=> {
    
    const { dialog } = require('electron')
    const { BrowserWindow } = require('electron')
    const url = require('url')
    const path = require('path')
    const myfs = require("./myfs")
console.log(mainWindow)
    const folder = dialog.showOpenDialog(undefined, {properties: ["openDirectory"] })
    if (folder != undefined) {
        document.getElementById("load_catalog").style="display:block;"
        document.getElementById("acatalog").style="display:none;"
        document.getElementById("progress").value=50
    }

    event.returnValue = true;
})