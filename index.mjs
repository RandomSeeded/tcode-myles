export const encode = {
  value(x) {
    if (x === null) return '~\n';
    if (typeof x !== 'string') throw new Error('value must be string');
    if (x.indexOf('\n') >= 0) return `$${x.length}\n${x}\n`;
    else return `+${x}\n`;
  }
};

export const decode = {
  value(x, offset = 0) {
    if (typeof x !== 'string') throw new Error('value must be string');
    if (offset == x.length) throw new Error('no value to decode');
    switch (x[offset]) {
      case '~': {
        if (x[offset + 1] !== '\n')
          throw new Error('value must be newline terminated');
        return [null, offset + 2];
      }
      case '+': {
        const end = x.indexOf('\n', offset);
        if (end === -1) throw new Error('simple string not terminated');
        return [x.substring(offset, end), end + 1];
      }
      case '$': {
        const lengthEnd = x.indexOf('\n', offset);
        if (lengthEnd === -1)
          throw new Error('bulk string length not terminated');
        const lengthStr = x.substring(offset, lengthEnd);
        if (!/\d+/.test(lengthEnd))
          throw new Error(
            `invalid length value at offset ${offset}: ${lengthStr}`
          );
        const length = parseInt(lengthStr, 10);
        offset = lengthEnd + 1;
        const end = x.indexOf('\n', offset);
        if (end === -1) throw new Error('bulk string not terminated');
        return [x.substring(offset, end), end + 1];
      }
      default:
        throw new Error(
          `no value to parse at offset ${offset}: ${x.slice(offset, 4)}...`
        );
    }
  }
};
