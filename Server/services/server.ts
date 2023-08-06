import express, { Express } from "express";
import session from "express-session";

export function initServer(): Express {
  const app = express();

  const jsonMiddleware = express.json();
  app.use(jsonMiddleware);

  // Настройка сессий
  app.use(session({
    secret: "12345", // замените на свой секретный ключ
    resave: false,
    saveUninitialized: true,
  }));

  app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });

  return app;
}
