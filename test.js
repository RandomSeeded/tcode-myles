import { encode, decode, stream } from './index'

test('encoding an array of null returns expected value', () => {
  expect(stream.streamEncode([null])).toMatchSnapshot();
});

test('decoding an array with type null works', () => {
  expect(stream.streamDecode('~\n', 0, 1)).toMatchSnapshot();
});

test('decoding an array with multiple elements works', () => {
  expect(stream.streamDecode('~\n~\n', 0, 2)).toMatchSnapshot();
});

test('we can both encode and decode', () => {
  const encoded = stream.streamEncode(['abcd', null, 'efgh']);
  expect(encoded).toMatchSnapshot();
  const decoded = stream.streamDecode(encoded, 0, 3);
  expect(decoded).toMatchSnapshot();
});

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
