'use strict';

var document = require('global/document');
var lazyload = require('lazyloadjs')();

var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++) {
  lazyload(iframes[i]);
}
