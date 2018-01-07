import { encode, decode, stream, int, pack } from './index'

test('packing encode works', () => {
  expect(pack.encode([['int', 'int'], [1, 2]])).toMatchSnapshot();
});

test('packing decode works', () => {
  expect(pack.decode([['int', 'int'], ['1', '2']])).toMatchSnapshot();
});

test('packing an int returns them encoded', () => {
  expect(int.pack(32)).toMatchSnapshot();
});

test('unpacking an int works', () => {
  expect(int.unpack("32")).toMatchSnapshot();
});

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
  expect(encode('foo')).toEqual('+foo\n')
})

test('empty string encoded as simple string', () => {
  expect(encode('')).toEqual('+\n')
})

test('presence of newline switches to bulk string encoding', () => {
  expect(encode('foo\n')).toEqual(`$4\nfoo\n\n`)
})

test('decode null', () => {
  expect(decode('~\n')).toEqual([null, 2])
})

test('decode simple string', () => {
  expect(decode('+foo\n')).toEqual(['foo', 5])
})

test('decode bulk string', () => {
  expect(decode('$4\nbar\n\n')).toEqual(['bar\n', 8])
})

test('decode stream', () => {
  let stream = '+foo\n+bar\n~\n'
  let offset, v0, v1, v2
  ;[v0, offset] = decode(stream, offset)
  ;[v1, offset] = decode(stream, offset)
  ;[v2, offset] = decode(stream, offset)
  expect([v0, v1, v2]).toEqual(['foo', 'bar', null])
})
