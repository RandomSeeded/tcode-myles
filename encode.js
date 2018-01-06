export default function(x) {
  if (x === null) return '~\n';
  if (typeof x !== 'string') throw new Error('value must be string');
  if (x.indexOf('\n') >= 0) return `$${x.length}\n${x}\n`;
  else return `+${x}\n`;
}
