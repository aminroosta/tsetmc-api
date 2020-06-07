# لیست نمادها

هر نماد شامل موارد زیر میباشد
```js
type Asset = {
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
```

برای گرفتن لیست تمام نماد ها از تابع زیر استفاده کنید
```js
import { assets } from 'todo-this-library-on-npm';

await assets();
// [
//  {
//      id: 'loader.aspx?ParTree=111C1412&inscode=32338211917133256',
//      asset_code: 'IRR1YASA0101',
//      group_code: 'N2',
//      industry: 'لاستيك و پلاستيك',
//      board: 'فهرست اوليه',
//      symbol_latin: 'YASX1',
//      name_latin: 'Iran Yasa Tire-R',
//      symbol: 'پاساح',
//      name: 'ح . ايران‌ياساتايرورابر'
//  },
//  ...
//]
```
## Local Development

```bash
yarn build
yarn test
yarn lint
```