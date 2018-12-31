[![GitHub issues](https://img.shields.io/github/issues/hudingyu/babel-plugin-import-slim.svg)](https://github.com/hudingyu/babel-plugin-import-slim/issues)
[![GitHub forks](https://img.shields.io/github/forks/hudingyu/babel-plugin-import-slim.svg)](https://github.com/hudingyu/babel-plugin-import-slim/network)
[![GitHub stars](https://img.shields.io/github/stars/hudingyu/babel-plugin-import-slim.svg)](https://github.com/hudingyu/babel-plugin-import-slim/stargazers)
[![GitHub license](https://img.shields.io/github/license/hudingyu/babel-plugin-import-slim.svg)](https://github.com/hudingyu/babel-plugin-import-slim/blob/master/LICENSE)

# babel-plugin-import-slim

## Usage

```bash
yarn add babel-plugin-import-slim --dev
```

Via `.babelrc.js` or babel-loader.

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

## Notes

If you want to use this plugin via `.babelrc`, it should be configured in `.babelrc.js`.
And `.babelrc` should be like this:
```javascript
{
  "presets": ["./.babelrc.js"]
}
```
