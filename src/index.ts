import osmosis from 'osmosis';
import needle from 'needle';

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
        asset.id = asset.id.split('=').pop() as string;
        all.push(asset);
      })
      .done(() => resolve(all));
  });
}

// 20200607@       date
// 10569.00@       high
// 10107.00@       low
// 10562.00@       final
// 10549.00@       close
// 10569.00@       open
// 10066.00@       yesterday
// 2413479648628.00@ value
// 228499778@      volume
// 17705@          count
//
export type OHLC = {
  tarikh: string;
  date: string;
  count: number;
  volume: number;
  value: number;
  open: number;
  high: number;
  low: number;
  close: number;
  final: number;
};

export function history(asset_id: string): Promise<OHLC[]> {
  return needle(
    'get',
    `http://members.tsetmc.com/tsev2/data/InstTradeHistory.aspx?i=${asset_id}&Top=999999&A=0`
  ).then(response => {
    return (response.body as string)
      .split(';')
      .filter(row => row)
      .map(row => {
        const [
          date,
          high,
          low,
          final,
          close,
          open,
          ,
          value,
          volume,
          count,
        ] = row.split('@');
        const year = date.substr(0, 4),
          month = date.substr(4, 2),
          day = date.substr(6, 2);
        const tarikh = new Date(+year, +month - 1, +day).toLocaleDateString(
          'fa-IR'
        );

        return {
          tarikh,
          date: `${year}-${month}-${day}`,
          count: +count,
          volume: +volume,
          value: +value,
          open: +open,
          high: +high,
          low: +low,
          close: +close,
          final: +final,
        };
      });
  });
}
