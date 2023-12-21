export function authorize(req, res, next) {
    if (!req.session || !res.session.user) {
        const err = new Error('not authorized');
        err.statusCode = 401;
        next(err);
    }
    next();
}