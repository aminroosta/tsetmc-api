import axios from 'axios';
import cheerio from 'cheerio';

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

export async function assets() : Promise<Asset[]> {
  const page = await axios.get('http://www.tsetmc.com/Loader.aspx?ParTree=111C1417');
  const $ = cheerio.load(page.data);
  const result = [];
  $('tbody tr').not(':first').each((_, tr) => {

  });

  return [];
}
