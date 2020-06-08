import xray from 'x-ray';
import request from 'superagent';

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
  return xray({
    filters: {
      getid: href => href.split('=').pop(),
    },
  })('http://www.tsetmc.com/Loader.aspx?ParTree=111C1417', 'table tr:not(:first-child)', [
    {
      id: 'td:nth-child(8) a@href | getid',
      asset_code: 'td:nth-child(1)',
      group_code: 'td:nth-child(2)',
      industry: 'td:nth-child(3)',
      board: 'td:nth-child(4)',
      symbol_latin: 'td:nth-child(5)',
      name_latin: 'td:nth-child(6)',
      symbol: 'td:nth-child(7)',
      name: 'td:nth-child(8)',
    },
  ]);
}

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
  return request
    .get(`http://members.tsetmc.com/tsev2/data/InstTradeHistory.aspx?i=${asset_id}&Top=999999&A=0`)
    .timeout({ response: 180 * 1000 })
    .then(response => {
      return response.text
        .split(';')
        .filter(row => row)
        .map(row => {
          const [date, high, low, final, close, open, , value, volume, count] = row.split('@');
          const year = date.substr(0, 4),
            month = date.substr(4, 2),
            day = date.substr(6, 2);
          const tarikh = new Date(+year, +month - 1, +day).toLocaleDateString('fa-IR');

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

export type Message = {
  title: string;
  tarikh: string;
  content: string;
};

export function messages(asset_id: string): Promise<Message[]> {
  return xray()(`http://www.tsetmc.com/Loader.aspx?Partree=15131W&i=${asset_id}`, 'tr', [
    {
      title: 'th:nth-child(1)',
      tarikh: 'th:nth-child(2)',
      content: 'td',
    },
  ]).then(rows => {
    let all = [];
    for (let idx = 0; idx < rows.length / 2; ++idx) {
      all.push(Object.assign({}, rows[idx * 2], rows[idx * 2 + 1]));
    }
    return all;
  });
}
