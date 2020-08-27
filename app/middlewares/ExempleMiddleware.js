class ExempleMiddleware {
    
    static handle(request, next){
        return next(request);
    }
}

module.exports = ExempleMiddleware