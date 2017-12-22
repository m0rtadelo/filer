const c = require("./constants")
const { ipcRenderer } = require('electron')

//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
/*
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
*/

/**
 * Events handler region
 */
document.getElementById("add_catalog").addEventListener("click", function () {
    const { dialog } = require('electron').remote
    const myfs = require("./myfs")
    const folder = dialog.showOpenDialog(undefined, { properties: ["openDirectory"] })
    if (folder != undefined) {
        document.getElementById("load_catalog").style = "display:block;"
        document.getElementById("acatalog").style = "display:none;"
        myfs.readDir(folder + "/", function (actual, total, fld) {
            //console.log(actual + "/" + total)
            document.getElementById("folder").innerHTML = fld;
            document.getElementById("progress").max = total;
            document.getElementById("progress").value = actual;
            document.getElementById("load_catalog").style.display = "none";// = "display:none;"
            document.getElementById("load_catalog").style.display = "block";// = "display:block;"
        })
        //alert("done")
    }

})