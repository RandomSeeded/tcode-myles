import { encode, decode } from './index'

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
