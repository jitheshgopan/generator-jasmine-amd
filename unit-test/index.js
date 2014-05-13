'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _  = require('underscore');
var fs = require('fs');
var chalk = require('chalk');

//Stored user config
var storedConfig = require('../app/helpers/storedConfig');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());


var UnittestGenerator = yeoman.generators.NamedBase.extend({
  init: function (args, options, config) {
      this.config = storedConfig.getConfig();
      this.sourceFileOriginalPath = this.name;
      this.argument('commonDependanciesFile', { type: String, required: false });
      if(!(/^.*?\.js$/.test(this.sourceFileOriginalPath)))
          this.sourceFileOriginalPath += '.js';
      //console.log(this.sourceFileOriginalPath);
      this.sourceFilePath = this.sourceFileOriginalPath.match(/(.*?)\.js/)[1];
      this.sourceModuleVar = _.camelize(this.sourceFilePath.match(/^(.+\/)*(.+)$/)[2]);
      this.commonDependancies = [];
      console.log('You called the unitTest subgenerator with the argument ' + this.name + '.', "\n");
      if(this.commonDependanciesFile) {
          this.log(chalk.magenta('Loading common dependencies from file: ' + this.commonDependanciesFile));
          try {
              var commonDependanciesContent = fs.readFileSync(this.commonDependanciesFile) || '[]';
              this.commonDependancies = JSON.parse(commonDependanciesContent);
          } catch(e) {
              this.log(chalk.red("Error loading common dependencied from file '" + this.commonDependanciesFile + "' : " + e.message));
          }
      }
  },

  unitTest: function () {
      console.log('Generating test spec for ' + this.sourceFileOriginalPath + '.');
      this.template('unitTest.js', 'test/spec/' + this.sourceFileOriginalPath);
  }
});

module.exports = UnittestGenerator;