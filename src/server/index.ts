import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.use(express.json()); //body parser

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is working BRO !");
});

app.post("/api/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const currentEmail = "bunyamin@mail.com";
  const currentPassword = "123A";

  if (email !== currentEmail) {
    return res.status(400).json({ message: "Yanlış email daxil etmisən :)" });
  } else if (password !== currentPassword) {
    return res.status(400).json({ message: "Şifrə yanlışdır" });
  }

  const message = `Salam ${email} ünvanının sahibi.Xoş gəlmisiniz ! `;

  return res.json({
    message: message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is working at ${PORT}`);
});
