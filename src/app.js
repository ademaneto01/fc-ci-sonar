import express from "express";
import { add } from "./utils/math.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/echo", (req, res) => {
  res.status(200).json({ youSent: req.body ?? null });
});

app.get("/sum", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: "Query params 'a' e 'b' devem ser números." });
  }
  return res.status(200).json({ result: add(a, b) });
});

export default app;
