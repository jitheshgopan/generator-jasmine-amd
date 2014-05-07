module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Jasmine tests - via grunt-contrib-jasmine
        jasmine: {
            testAll: {
              options: {
                specs: 'test/spec/**/*.js',
                host: '',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                  requireConfigFile: '<%= publicDir %>/js/main.js'
                }
              }
            }
        }
    });
    
    //Load jasmine task
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    
    //Create an alias task named 'test' for ease of use
    grunt.registerTask('test', ['jasmine'])
};