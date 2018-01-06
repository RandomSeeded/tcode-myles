'use strict';

import encode from './encode';
import decode from './decode';

const _ = require('lodash');

// stream.encode = function(iterable) {} -> js string representing that array
// stream.decode = function(tcode: string, offset: int = 0, maxNumOfThingsToPull): [[values,go,here], nextOffset] {}

function streamEncode(thingsToEncode) {
  return _.map(thingsToEncode, encode).join('');
}

const TYPE_NULL = '~';
const TYPE_SIMPLE = '+';
const TYPE_BULK = '$';

function streamDecode(stringToDecode, offsetBytes, numberOfElementsToPull) {
  // const subsetWeCareAbout = stringToDecode.substr(offsetBytes);
  // start mapping at the offset actually
  const outputBuffer = [];
  let currentOffset = offsetBytes;
  while (_.size(outputBuffer) < numberOfElementsToPull && currentOffset < stringToDecode.length) {
    // decode
    const type = stringToDecode[currentOffset];
    switch (type) {
      case TYPE_NULL: {
        outputBuffer.push(null);
        currentOffset += 2;
        break;
      }
      case TYPE_SIMPLE: {
        const end = _.indexOf(stringToDecode, '\n', currentOffset);
        const encodedSimpleString = stringToDecode.substring(currentOffset, end + 1);
        const decodedSimpleString = decode(encodedSimpleString);
        console.log('decodedSimpleString', decodedSimpleString);
        currentOffset = end + 1;
        outputBuffer.push(decode(_.first(decodedSimpleString)));
        break;
      }
      case TYPE_BULK: {
        break;
      }
      default:
        throw new Error('fill this in properly later');
    }
  }
  return [outputBuffer, currentOffset];
}

module.exports = {
  streamEncode,
  streamDecode,
};
