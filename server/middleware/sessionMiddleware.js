import session from 'express-session';
const memoryStore = new session.MemoryStore();

export const sessionMiddleware = session({
    secret: "secret123",
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 12 },
    saveUninitialized: false,
    store: memoryStore
})

export const wrap = expressMiddleware => (socket, next) =>
    expressMiddleware(socket.request, {}, next);