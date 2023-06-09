import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const LoginInput = z.object({
  username: z.string(),
  password: z.string(),
});

app.post("/login", (req, res) => {
  try {
    const { username, password } = LoginInput.parse(req.body);
    if (password !== "bar") {
      throw new Error("Wrong credentials");
    }
    const token = jwt.sign({ username }, "secret");
    res.status(200).json({ username, token });
  } catch (e) {
    res.status(400).send(`Login failed 👎: ${e.message}`);
  }
});

app.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ username: req.context.username });
});

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.match(/Bearer (.*)/)[1];
  if (!token) {
    res.status(401).send("Unauthorized");
  } else {
    try {
      jwt.verify(token, "secret");
      const { username } = jwt.decode(token);
      req.context = { ...(req.context ?? {}), username };
      next();
    } catch (e) {
      res.status(401).send("Unauthorized");
    }
  }
}

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

process.once("SIGUSR2", () => {
  server.close();
});
