'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var _ = require('underscore');

//generator configuration for easy access across files/sub generators
var genConfig = require('./config');
var rcFileName = genConfig.rcFileName;

var defaultConfig = {
    jsSourceDir: 'public/js'
}

var helpers = require('./helpers/helpers');
var JasmineAmdGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.config = defaultConfig;
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },
    
    loadConfigFromRc: function() {
        var configFromRc;
        try {
            if(configFromRc = JSON.parse(fs.readFileSync(rcFileName))){
                this.config = _.extend(this.config, configFromRc);
            }
        }catch(e) {
            //rC config file doesnt exist or not parsed as valid JSON
        }
        this.configFromRc = configFromRc;
    },
    checkExistingProject: function() {
        if(this.options['existing-project'] && !this.configFromRc.jsSourceDir) {
            //If existing project, and jsSourceDir not given in rcConfig, prevent default "jsSourceDir" from being used
            this.config.jsSourceDir = undefined;
        }
    },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic JasmineAmd generator.'));
    var prompts = [];
    if(!this.options['existing-project']) {
        prompts.push({
          name: 'appName',
          message: 'Name of the project?',
          default: 'My project'
        });
    }
    if(!this.config.jsSourceDir) {
        prompts.push({
            name: 'jsSourceDir',
            message: 'Your javascript source files directory eg: public/js'
        });
    }
      
    this.prompt(prompts, function (props) {
      this.appName = props.appName;
        if(props.jsSourceDir)
            this.config.jsSourceDir = props.jsSourceDir;
      done();
    }.bind(this));
  },

  app: function () {
    var commonDependanciesContent;
    try {
        commonDependanciesContent = this.commonDependanciesFile ? fs.readFileSync(this.commonDependanciesFile) : '[]';
    }catch(e) {
        commonDependanciesContent = '[]';
    }
    this.commonDependancies = JSON.parse(commonDependanciesContent);
    var publicDir = this.publicDir = 'public';
    //Make the test directory
    this.mkdir('test');

    //The javascript source directory
    helpers.mkdirRec(this.config.jsSourceDir);
    
    if(!this.options['existing-project']) {
        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.template('main.js', helpers.stripTrailingSlash(this.config.jsSourceDir) + '/main.js');
        this.template('Gruntfile.js', 'Gruntfile.js');
    }
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },
    saveConfigToRc: function() {
        fs.writeFileSync(rcFileName, JSON.stringify(this.config));
    }
});

module.exports = JasmineAmdGenerator;