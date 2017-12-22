const fs = require("fs");
let library = [];

const pending = {
    "started": 0,
    "finished": 0,
    clear: function () {
        this.started = 0;
        this.finished = 0;
    },
    starts: function () {
        this.started++;
    },
    ended: function () {
        this.finished++;
    },
    done: function () {
        return this.started === this.finished
    }
}
/**
 * Reads files and stats from path recursively
 * @param {*} rootFolder Path to root folder to start reding recursively
 * @param {*} cb callback function with results
 * @deprecated
 */
function readDir(rootFolder, progress, clear = true) {
    if (clear) {
        library = [];
        pending.clear();
    }
    pending.starts();
    fs.readdir(rootFolder, function (err, files) {

        for (var i = 0, tam = files.length; i < tam; i++) {
            const file = files[i]
            if (progress)
                progress(i + 1, tam, rootFolder);

            const stats = fs.statSync(rootFolder + file);
            //fs.stat(rootFolder + file, function (err, stats) {

            if (stats.isDirectory())
                readDir(rootFolder + file + "/", progress, false);
            else
                addFile(rootFolder + file, stats);

            //check(cb);
            //})
        };
    // if (files.length === 0)
    //     check(cb)
});
}
function check(cb) {
    pending.ended();
    if (pending.done())
        cb(library);
}

/**
 * Reads files and stats from path recursively and sync
 * @param {*} rootFolder Path to root folder to start reading recursively
 */

function readDirSync(rootFolder, progress, clear = true) {
    if (clear)
        library = [];

    const files = fs.readdirSync(rootFolder);
    for (var i = 0, tam = files.length; i < tam; i++) {
        const file = files[i];
        if (progress)
            progress(i + 1, tam, rootFolder);
        const stats = fs.statSync(rootFolder + file);
        if (stats.isDirectory())
            readDirSync(rootFolder + file + "/", progress, false);
        else
            addFile(rootFolder + file, stats)
    }
    return library;
}

/**
 * Adds file to library collection
 * @param {*} file the file to add
 * @param {*} stats the stats information object
 */
function addFile(file, stats) {
    let chunks = file.split('/');
    const obj = {};
    obj.id = library.length;
    obj.file = chunks[chunks.length - 1];
    chunks = chunks.slice(0, chunks.length - 1);
    obj.path = chunks.join('/') + '/';
    chunks = file.split('.')
    if (chunks.length > 1)
        obj.extension = chunks[chunks.length - 1].toLowerCase();
    obj.fullPath = file;
    obj.size = stats.size;
    obj.atime = stats.atime;
    obj.mtime = stats.mtime;
    obj.ctime = stats.ctime;
    obj.birth = stats.birthtime;
    let year = new Date(stats.birthtime).getFullYear();
    if (year == "1970")
        year = new Date(stats.ctime).getFullYear();
    obj.year = year;
    library.push(obj);
}
module.exports = {
    readDir,
    readDirSync,
    fs
}