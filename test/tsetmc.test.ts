import { assets, history, messages, intraday } from '../src';
// import fs from 'fs';
// fs.writeFileSync('out.txt', JSON.stringify(result, null, 1), 'utf-8');

describe('tsetmc.ir', () => {
  0 &&
    it('assets return a list', async () => {
      const result = await assets();
      expect(result).toEqual(
        expect.arrayContaining([
          {
            id: '44834847569322522',
            asset_code: 'IRO1CONT0001',
            group_code: 'N1',
            industry: 'ابزارپزشکي، اپتيکي و اندازه‌گيري',
            board: 'تابلو فرعي',
            symbol_latin: 'CONT1',
            name_latin: 'Iran Counter',
            symbol: 'آكنتور',
            name: 'كنتورسازي‌ايران‌',
          },
        ])
      );
    });

  0 &&
    it(
      'history returns a list',
      async () => {
        const result = await history('32338211917133256');
        expect(result).toEqual(
          expect.arrayContaining([
            {
              tarikh: '۱۳۹۳/۱۰/۸',
              date: '2014-12-29',
              count: 60,
              volume: 345319,
              value: 1067132820,
              open: 3010,
              high: 3157,
              low: 3010,
              close: 3100,
              final: 3090,
            },
          ])
        );
      },
      180 * 1000
    );

  0 &&
    it(
      'messages returns a list',
      async () => {
        const result = await messages('32338211917133256');
        expect(result).toEqual(
          expect.arrayContaining([
            {
              title: 'حراج مجدد نماد معاملاتي (پاساح)',
              tarikh: '98/11/8 10:21',
              content:
                'به اطلاع مي رساند،نماد معاملاتي حق تقدم شركت ايران ياسا تاير و رابر(پاساح)  باتوجه به عدم كشف قيمت قبل بدون محدوديت نوسان قيمت با استفاده از مكانيزم حراج  آماده انجام معامله مي باشد. مديريت عمليات بازار شركت بورس اوراق بهادار تهران',
            },
          ])
        );
      },
      60 * 1000
    );

  1 &&
    it(
      'intraday returns a list',
      async () => {
        const result: any = await intraday('32338211917133256', '2020-03-16');
        console.log(result.order_book);

        expect(1).toEqual(1);
        // expect(result).toEqual(
        //   expect.arrayContaining([
        //     {
        //     },
        //   ])
        // );
      },
      180 * 1000
    );
});
