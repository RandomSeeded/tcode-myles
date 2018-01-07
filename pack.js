'use strict';

const _ = require('lodash');

// TODO (nw): look into changing import syntax of this
const int = require('./int');

// mappings between string types and functions
const mappings = {
  int,
  // more go here
};

// packed.encode([array of types], [array of corresponding data])
function encode([types, values]) {
  let outputBuffer = [];
  _.times(_.size(types), i => {
    const type = types[i];
    const value = values[i];
    outputBuffer.push(mappings[type].pack(value));
  });
  return outputBuffer;
}

// packed.decode([array of types], [array of corresponding data], offset) -> [[array of js typed values], new offset]
function decode([types, values]) {
  let outputBuffer = [];
  _.times(_.size(types), i => {
    const type = types[i];
    const value = values[i];
    outputBuffer.push(mappings[type].unpack(value));
  });
  return outputBuffer;
}

module.exports = {
  encode,
  decode,
};
