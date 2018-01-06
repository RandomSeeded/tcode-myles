tcode. a tiny encoding system

api:

```
import { encode, decode } from 'tcode'
let v = encode('foo') //=> '+foo\n'
decode(v, 0) //=> [ '+foo', 5 ]
```

- `encode` takes a string and returns the encoded value
- `decode` takes a string and a byte offset, then returns a tuple of the decoded value and the offset of the byte immediately following that value

see `test.js` for more examples
