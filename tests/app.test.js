import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import app from "../src/app.js";

function request(method, path, { body, headers } = {}) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      { host: "localhost", port: 0, path, method, headers },
      res => {
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", chunk => (raw += chunk));
        res.on("end", () => {
          let json;
          try { json = raw ? JSON.parse(raw) : undefined; } catch { json = undefined; }
          resolve({ status: res.statusCode, body: json });
        });
      }
    );
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

test("GET /health retorna ok:true", async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  const res = await new Promise((resolve, reject) => {
    http.get({ host: "localhost", port, path: "/health" }, r => {
      let raw = "";
      r.on("data", c => (raw += c));
      r.on("end", () => resolve({ status: r.statusCode, body: JSON.parse(raw) }));
    }).on("error", reject);
  });

  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { ok: true });
  server.close();
});

test("POST /echo retorna o corpo enviado", async () => {
  const server = app.listen(0);
  const port = server.address().port;

  const result = await new Promise((resolve, reject) => {
    const data = JSON.stringify({ msg: "hello" });
    const req = http.request(
      { host: "localhost", port, path: "/echo", method: "POST", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } },
      res => {
        let raw = "";
        res.on("data", c => (raw += c));
        res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(raw) }));
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });

  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { youSent: { msg: "hello" } });
  server.close();
});

test("GET /sum soma query params a e b", async () => {
  const server = app.listen(0);
  const port = server.address().port;

  const res = await new Promise((resolve, reject) => {
    http.get({ host: "localhost", port, path: "/sum?a=2&b=3" }, r => {
      let raw = "";
      r.on("data", c => (raw += c));
      r.on("end", () => resolve({ status: r.statusCode, body: JSON.parse(raw) }));
    }).on("error", reject);
  });

  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { result: 5 });
  server.close();
});

test("GET /sum valida parâmetros inválidos", async () => {
  const server = app.listen(0);
  const port = server.address().port;

  const res = await new Promise((resolve, reject) => {
    http.get({ host: "localhost", port, path: "/sum?a=x&b=3" }, r => {
      let raw = "";
      r.on("data", c => (raw += c));
      r.on("end", () => resolve({ status: r.statusCode, body: JSON.parse(raw) }));
    }).on("error", reject);
  });

  assert.equal(res.status, 400);
  assert.equal(res.body.error.includes("Query params"), true);
  server.close();
});
