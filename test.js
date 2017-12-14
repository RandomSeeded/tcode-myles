require = require('@std/esm')(module);
const { encode, decode } = require('./index.mjs');

test('strings without newlines encoded as simple strings', () => {
  expect(encode('foo')).toMatchSnapshot();
});

test('empty string encoded as simple string', () => {
  expect(encode('')).toMatchSnapshot();
});

test('presence of newline switches to bulk string encoding', () => {
  expect(encode('foo\n')).toMatchSnapshot();
});

test('decode null', () => {
  expect(decode('~\n')).toMatchSnapshot();
});

test('decode simple string', () => {
  expect(decode('+foo\n')).toMatchSnapshot();
});

test('decode bulk string', () => {
  expect(decode('$4\nbar\n\n')).toMatchSnapshot();
});

test('decode stream', () => {
  let stream = '+foo\n+bar\n~\n';
  let offset, v0, v1, v2;
  [v0, offset] = decode(stream, offset);
  [v1, offset] = decode(stream, offset);
  [v2, offset] = decode(stream, offset);
  expect([v0, v1, v2]).toMatchSnapshot();
});
