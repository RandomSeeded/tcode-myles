'use strict';

import encode from './encode';

const _ = require('lodash');

// stream.encode = function(iterable) {} -> js string representing that array
// stream.decode = function(tcode: string, offset: int = 0, maxNumOfThingsToPull): [[values,go,here], nextOffset] {}

function streamEncode(thingsToEncode) {
  return _.map(thingsToEncode, encode).join('');
  // return null;
}

function streamDecode(stringToDecode, offsetBytes, numberOfElementsToPull) {
}

module.exports = {
  streamEncode,
};
