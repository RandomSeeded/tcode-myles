require = require('@std/esm')(module);
const { encode, decode } = require('./index.mjs');

test('strings without newlines encoded as simple strings', () => {
  expect(encode.value('foo')).toMatchSnapshot();
});

test('empty string encoded as simple string', () => {
  expect(encode.value('')).toMatchSnapshot();
});

test('presence of newline switches to bulk string encoding', () => {
  expect(encode.value('foo\n')).toMatchSnapshot();
});

test('decode null', () => {
  expect(decode.value('~\n')).toMatchSnapshot();
});

test('decode simple string', () => {
  expect(decode.value('+foo\n')).toMatchSnapshot();
});

test('decode bulk string', () => {
  expect(decode.value('$4\nbar\n\n')).toMatchSnapshot();
});

test('decode stream', () => {
  let stream = '+foo\n+bar\n~\n';
  let offset, v0, v1, v2;
  [v0, offset] = decode.value(stream, offset);
  [v1, offset] = decode.value(stream, offset);
  [v2, offset] = decode.value(stream, offset);
  expect([v0, v1, v2]).toMatchSnapshot();
});
