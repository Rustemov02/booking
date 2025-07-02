import express, { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/api/data", (req: Request, res: Response) => {
  const sampleData = {
    message: "It is testing",
    item: [1, 2, 3, 4, 5],
  };

  res.json(sampleData);
});

app.listen(PORT, () => console.log("Server running at your hand !"));
