'use strict';

function pack(int) {
  return ''+int;
}

function unpack(encoded) {
  return parseInt(encoded);
}

module.exports = {
  pack,
  unpack,
}
