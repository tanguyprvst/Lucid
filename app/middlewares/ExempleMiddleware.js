class ExempleMiddleware {
    
    static handle(res, request, next){
        return next(res, request);
    }
}

module.exports = ExempleMiddleware