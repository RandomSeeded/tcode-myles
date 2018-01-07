tcode. a tiny encoding system

api:

```
import { encode, decode } from 'tcode'
let v = encode('foo') //=> '+foo\n'
decode(v, 0) //=> [ 'foo', 5 ]
```

- `encode` takes a string and returns the encoded value
- `decode` takes a string and a byte offset, returns a tuple of the decoded value and the offset of the byte immediately following that value

see `test.js` for more examples

Encoded values of two types:

1. string
2. null

Two encodings for string:

1. simple encoding
2. bulk encoding

Always suffixed with a newline
Always prefixed with a typecode

Typecodes:
- $[len] -> bulkstring
- ~\n -> null
- + -> simplestring

TODAY:

###Streaming###

stream.encode = function(iterable) {} -> js string representing that array
stream.decode = function(tcode: string, offset: int = 0, maxNumOfThingsToPull): [[values,go,here], nextOffset] {}

(also think about how you're going to determine simple string vs bulk string)

###Packing###

whatever.int.pack -> int to encoded
whatever.int.unpack -> encoded to js int
packed.encode([array of types], [array of corresponding data])
packed.decode([array of types], [array of corresponding data], offset) -> [[array of js typed values], new offset]

