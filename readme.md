"officially" the tcode format is specified in terms of byte strings. but this implementation only supports the subset of byte strings that are js strings.

api:

- `encode` takes a string and returns the encoded value
- `decode` takes a string and a byte offset, then returns a tuple of the decoded value and the offset of the byte immediately following that value

```
import { encode, decode } from 'tcode'
let v = encode('foo') //=> '+foo\n'
decode(v, 0) //=> [ '+foo', 5 ]
```

see `test.js` for more examples
