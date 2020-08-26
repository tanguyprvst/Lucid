class ExempleMiddleware {
    
    static handle(request, next){
        console.log('exemple');
        return next(request);
    }
}

module.exports = ExempleMiddleware