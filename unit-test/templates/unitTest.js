/*global describe, it */
'use strict';
define([<% _.each(commonDependancies, function(dependancy, index){
    for(var i in dependancy) {
        print("'" + i + "'");
        print(', ');
    }
})%> '<%= config.jsSourceDir + "/" + sourceFilePath %>'], function(<% _.each(commonDependancies, function(dependancy, index){
    for(var i in dependancy) {
        print(dependancy[i]);
        print(', ');
    }
})%> <%= sourceModuleVar %>){
    describe('Testing module: <%= sourceModuleVar %>', function () {
        it('Some_assertions_here', function () {

        });
    });
});