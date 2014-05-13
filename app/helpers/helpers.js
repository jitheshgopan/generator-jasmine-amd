var fs = require('fs');
var helpers = module.exports = {
    mkdirRec : function (path) {
        var pathSep = require('path').sep;
        var dirs = path.split(pathSep);
        var root = "";

        while (dirs.length > 0) {
            var dir = dirs.shift();
            if (dir === "") {// If directory starts with a /, the first path will be an empty string.
                root = pathSep;
            }
            if (!fs.existsSync(root + dir)) {
                fs.mkdirSync(root + dir);
            }
            root += dir + pathSep;
        }
    },
    stripTrailingSlash : function(str) {
        return str.replace(/\/+$/, "");
    }
};

