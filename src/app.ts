import express from "express";
import type { Application } from "express";
import cors from "cors";
import serverKey from "./middleware/server.key";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(serverKey);
app.use(routes);

const PORT: number = (process.env.PORT as unknown as number) || 3000;

app.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
