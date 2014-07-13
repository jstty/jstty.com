'use strict';

var _    = require('lodash');

module.exports = JsttyService;

function JsttyService(options){
    this.options = _.merge({
    }, options);
}

JsttyService.prototype.load = function() {
};
