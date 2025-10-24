import express from "express";
import { add } from "./utils/math.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});


app.post("/echo", (req, res) => {
  const body = req.body;
  const isEmptyObject =
    body == null ||
    (typeof body === "object" && !Array.isArray(body) && Object.keys(body).length === 0);

  res.status(200).json({ youSent: isEmptyObject ? null : body });
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
