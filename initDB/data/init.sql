CREATE TABLE IF NOT EXISTS users (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     email TEXT UNIQUE NOT NULL,
                                     password_hash TEXT NOT NULL,
                                     name TEXT NOT NULL,
                                     phone TEXT,
                                     address TEXT,
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS roles (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       name TEXT UNIQUE NOT NULL
);