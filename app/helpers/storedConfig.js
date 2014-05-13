var fs = require('fs');
//generator configuration for easy access across files/sub generators
var genConfig = require('../config.json');

module.exports = {
    getConfig : function() {
        try {
            return JSON.parse(fs.readFileSync(genConfig.rcFileName));
        }catch(e) {
            console.error(e);
        }
    }
}