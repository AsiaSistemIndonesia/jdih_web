const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./database");

const sessionMiddleware = session({
  store: new pgSession({
    pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
  }),

  secret: process.env.SESSION_SECRET || "secret-session-development",

  resave: false,

  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 8, // 8 jam
  },
});

module.exports = sessionMiddleware;