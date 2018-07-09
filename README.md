# Utils
Utils for Javascript/Nodejs


## Installation
npm
``` shell
$ npm install -g @arted/utils
```

or yarn
``` shell
$ yarn global add @arted/utils
```

## Usage
``` javascript
const fs = '@arted/utils/fs';

// 获取文件状态
async function getStats() {
    return await fs.stat('path/to/file.json');
}
```
