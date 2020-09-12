type A1 = string;
type A2 = number;

function client(a: number): A2;
function client(a: string): A1;
function client(a: number | string): A1 | A2 {
  if (typeof a === 'string') return '';
  if (typeof a === 'number') return 1;

  return '';
}


const a = client('');

export {
  client,
};
