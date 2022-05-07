TeamService.js

```js
import axios from 'axios'

import api from '@/api/api'

let TeamService = {
  query: (params) => Vue.prototype.$post(`${api.team.query}`, params),
  batchDel: (params) => Vue.prototype.$post(`${api.team.batchDel}`, params),
  add: (params) => Vue.prototype.$post(`${api.team.add}`, params),
}
export { TeamService }

```

