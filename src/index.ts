import osmosis from 'osmosis';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export type Asset = {
  id: string;
  asset_code: string;
  group_code: string;
  industry: string;
  board: string;
  symbol: string;
  symbol_latin: string;
  name: string;
  name_latin: string;
};

export function assets(): Promise<Asset[]> {
  return new Promise((resolve, _) => {
    const all: Asset[] = [];
    osmosis
      .get('http://www.tsetmc.com/Loader.aspx?ParTree=111C1417')
      .find('table tr:gt(0)')
      .set({
        id: 'td:eq(7) a@href',
        asset_code: 'td:eq(0)',
        group_code: 'td:eq(1)',
        industry: 'td:eq(2)',
        board: 'td:eq(3)',
        symbol_latin: 'td:eq(4)',
        name_latin: 'td:eq(5)',
        symbol: 'td:eq(6)',
        name: 'td:eq(7)',
      })
      .data((asset: Asset) => {
        asset.id = asset.id.split('=').pop();
        all.push(asset);
      })
      .done(() => {
        resolve(all);
      });
  });
}
