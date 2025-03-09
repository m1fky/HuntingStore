CREATE TABLE IF NOT EXISTS users (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     email TEXT UNIQUE NOT NULL,
                                     password_hash TEXT NOT NULL,
                                     name TEXT NOT NULL,
                                     phone TEXT,
                                     address TEXT,
                                     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS products (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     name TEXT NOT NULL,
                                     description TEXT,
                                     price FLOAT NOT NULL,
                                     stock INT NOT NULL DEFAULT 0,
                                     category TEXT,
                                     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS orders (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     user_id INTEGER FOREIGN KEY REFERENCES users(id),
                                     status TEXT DEFAULT "new",
                                     total_price FLOAT NOT NULL,
                                     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS roles (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS order_items (
                                     order_id INTEGER FOREIGN KEY REFERENCES orders(id),
                                     product_id INTEGER FOREIGN KEY REFERENCES products(id),
                                     quantity INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS user_roles (
                                     user_id INTEGER FOREIGN KEY REFERENCES users(id),
                                     role_id INTEGER FOREIGN KEY REFERENCES roles(id),
                                     quantity INTEGER NOT NULL
);
