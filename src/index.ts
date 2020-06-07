export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export type Asset = {
    code: string,
    group: string,
    group_industry: string,
    board: string,
    symbol: string,
    symbol_latin: string,
    name: string,
    name_latin: string
};

export function assets() : Asset[] {

    return [];
}
