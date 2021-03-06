# Lucid
JS Micro-Framework

## Table of Contents

* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Usage](#usage)
  * [Controllers](#controllers)
  * [Routes](#routes)
  * [Middlewares](#middlewares)
* [Contributing](#contributing)

## Getting Started

### Installation

Clone the repo
```sh
git clone https://github.com/tanguyprvst/Lucid.git
```
Install NPM packages
```sh
npm install
```

## Usage

### Controllers

Create a controller in ``app/controllers``

```js
const Controller = require('../../src/app/controller');

class ExempleController extends Controller {

}

module.exports = ExempleController
```

Create your routes and methods!

```js
const Controller = require('../../src/app/controller');

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
```

### Routes

GET method:
```js
['/', 'get', this.exempleFunc]
```
```js
exempleFunc(res){ //Todo: code }
```

POST method:
```js
['/', 'post', this.exempleFunc]
```
```js
exempleFunc(res, request){ //Todo: code }
```

Route with parameter:
```js
['/tickets/{id}', 'get', this.exempleFunc]
```
```js
exempleFunc(res, id){ //Todo: code }
```

### Middlewares

Create a controller in ``app/middlewares``

```js
class ExempleMiddleware {
    
    static handle(res, request, next){
        return next(res, request);
    }
}

module.exports = ExempleMiddleware
```

In your controller, import your middleware

```js
const ExempleMiddleware = require('../middlewares/ExempleMiddleware');
```

And use your middleware by changing your route!

```js
['/', 'get', this.exempleFunc, ExempleMiddleware]
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
