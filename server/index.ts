import express, { Request, Response } from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!" });
});

ViteExpress.listen(app, 3000, () => {
  console.log("Server is listening on port 3000...");
});
