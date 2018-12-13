const babel = require('babel-core');
const types = require('babel-types');

const plugin = require('./../lib/index.js');

const visitor = plugin({types});

const code = `
    import { Select as BeeSelect, Pagination } from '@dp/bee-ui';
    import { DatePicker } from '@dp/bee-ui';
    import * as Bee from '@dp/bee-ui';
    import lodash from 'lodash';
`;

const result = babel.transform(code, {
    plugins: [
        [
            visitor,
            {
                "libraryName": "@dp/bee-ui",
                "camel2DashComponentName": true,
                "customSourceFunc": (name) => {
                    // @dp/bee-ui 1.0.0
                    if (name === 'bee-option') {
                        return `@dp/bee-ui/src/components/ui-base/select/${name}`;
                    }
                    if (name.startsWith('bee-')) {
                        return `@dp/bee-ui/src/components/ui-base/${name.substr(4)}/${name}`;
                    }
                    if (['radio', 'radio-button', 'radio-group'].includes(name)) {
                        return `@dp/bee-ui/src/components/ui-base/radio/bee-${name}`;
                    }
                    if (['checkbox', 'checkbox-button', 'checkbox-group'].includes(name)) {
                        return `@dp/bee-ui/src/components/ui-base/checkbox/bee-${name}`;
                    }
                    if (name === 'date-combine-range-picker') {
                        name = 'dateCombine-range-picker';
                    }
                    if (name === 'tipsover') {
                        return `@dp/bee-ui/src/components/ui-base/tipsover/tipsover-theme`;
                    }
                    if (name === 'loading' || name === 'toast') {
                        return `@dp/bee-ui/src/components/ui-base/${name}/index.js`;
                    }
                    return `@dp/bee-ui/src/components/ui-base/${name}/${name}`;
                }
            }
        ]
    ]
});

console.log(result.code);