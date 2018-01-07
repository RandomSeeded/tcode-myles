'use strict';

import encode from './encode';
import decode from './decode';

const _ = require('lodash');

function streamEncode(thingsToEncode) {
  return _.map(thingsToEncode, encode).join('');
}

function streamDecode(stringToDecode, offsetBytes, numberOfElementsToPull) {
  // const subsetWeCareAbout = stringToDecode.substr(offsetBytes);
  // start mapping at the offset actually
  let numElementsDecoded = 0;
  let currentOffset = offsetBytes;
  const outputBuffer = [];
  while (numElementsDecoded < numberOfElementsToPull) {
    const [nextValue, nextOffset] = decode(stringToDecode, currentOffset);
    outputBuffer.push(nextValue);
    currentOffset = nextOffset;
    numElementsDecoded += 1;
  }
  return [outputBuffer, currentOffset];
}

module.exports = {
  streamEncode,
  streamDecode,
};
