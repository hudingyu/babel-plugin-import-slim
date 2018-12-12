
# babel-plugin-import-slim

## Usage

```bash
yarn add babel-plugin-import-slim --dev
```

Via `.babelrc` or babel-loader.

```js
{
  "plugins": [["import-slim", options]]
}
```
### options

`options` can be object.

```javascript
{
  "libraryName": "bee-ui",
  "camel2DashComponentName": true,  // default: false
  "customSourceFunc": (name) => {
       // something
  }
}
```

or

```javascript
{
  "libraryName": "bee-ui",
  "camel2UnderlineComponentName": true,  // default: false
  "customSourceFunc": (name) => {
        // something
   }
}
```

`options` can be array.

```javascript
[
    {
      "libraryName": "bee-ui",
      "camel2UnderlineComponentName": true,
      "customSourceFunc": (name) => {
            // something
       }
    },
    {
      "libraryName": "moma-ui",
      "camel2UnderlineComponentName": true,
      "customSourceFunc": (name) => {
            // something
       }
    },
]
```

## Example

### From
```javascript
import { Select as BeeSelect, Pagination, DatePicker } from '@dp/bee-ui';
```

### To
```javascript
import BeeSelect from '@dp/bee-ui/src/components/ui-base/select/select';
import Pagination from '@dp/bee-ui/src/components/ui-base/pagination/pagination';
import DatePicker from '@dp/bee-ui/src/components/ui-base/date-picker/date-picker';
```


