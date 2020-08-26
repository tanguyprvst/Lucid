class Middleware {

    constructor(){}

    handle(req, next){ next() }
}

module.exports = Middleware