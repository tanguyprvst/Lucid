# Lucid
JS Micro-Framework

## Installation

Use the package manager [npm](https://www.npmjs.com).

```bash
npm install
```
## Usage

Create a controller in ``app/controller``

```js
const Controller = require('../../src/controller');

class ExempleController extends Controller {

}

module.exports = ExempleController
```

And now, create your routes and methods!
```js
const Controller = require('../../src/controller');

class ExempleController extends Controller {
 getRoutes(){
        return [
            ['/', 'get', this.exempleFunc],
        ]
    }

    exempleFunc(res){
        this.render(res, {value: "Hello"});
    }
}

module.exports = ExempleController
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
