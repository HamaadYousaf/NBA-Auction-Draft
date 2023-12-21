import session from 'express-session';
import { config } from 'dotenv';
config({ path: '../.env' })

export const sessionMiddleware = session({
    secret: process.env.SECRET_KEY,
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    saveUninitialized: false,
})