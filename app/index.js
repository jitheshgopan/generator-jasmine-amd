'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');


var JasmineAmdGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic JasmineAmd generator.'));

    var prompts = [{
      name: 'appName',
      message: 'Name of the project?',
      default: 'My project'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      done();
    }.bind(this));
  },

  app: function () {
    var getJasmineConfig = fs.readFileSync(this.commonDependanciesFile) || '[]';
    this.commonDependancies = JSON.parse(commonDependanciesContent);
    var publicDir = this.publicDir = 'public';
    //Make the test directory
    this.mkdir('test');

    //The public directory
    this.mkdir(publicDir);
    //The javascripts directory
    this.mkdir(publicDir + '/js');
    

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
      
      this.template('main.js', publicDir + '/js/main.js');
      this.template('Gruntfile.js', 'Gruntfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = JasmineAmdGenerator;