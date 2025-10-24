// tests/app.test.js
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import app from "../src/app.js";

function startServer() {
  const server = app.listen(0);
  const { port } = server.address();
  return { server, port };
}

function httpGet(port, path, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: "localhost", port, path, method: "GET", headers },
      res => {
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", c => (raw += c));
        res.on("end", () => {
          let body;
          try { body = raw ? JSON.parse(raw) : undefined; } catch { body = undefined; }
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function httpPost(port, path, bodyObj = undefined, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = bodyObj ? JSON.stringify(bodyObj) : "";
    const req = http.request(
      {
        host: "localhost",
        port,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          ...headers,
        },
      },
      res => {
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", c => (raw += c));
        res.on("end", () => {
          let body;
          try { body = raw ? JSON.parse(raw) : undefined; } catch { body = undefined; }
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

test("GET /health retorna ok:true", async () => {
  const { server, port } = startServer();
  const res = await httpGet(port, "/health");
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { ok: true });
  server.close();
});

test("POST /echo retorna o corpo enviado", async () => {
  const { server, port } = startServer();
  const res = await httpPost(port, "/echo", { msg: "hello" });
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { youSent: { msg: "hello" } });
  server.close();
});

test("POST /echo com corpo vazio retorna youSent:null", async () => {
  const { server, port } = startServer();
  // enviando Content-Length: 0
  const res = await new Promise((resolve, reject) => {
    const req = http.request(
      { host: "localhost", port, path: "/echo", method: "POST", headers: { "Content-Type": "application/json", "Content-Length": 0 } },
      r => {
        let raw = "";
        r.on("data", c => (raw += c));
        r.on("end", () => resolve({ status: r.statusCode, body: JSON.parse(raw) }));
      }
    );
    req.on("error", reject);
    req.end();
  });
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { youSent: null });
  server.close();
});

test("GET /sum soma query params a e b", async () => {
  const { server, port } = startServer();
  const res = await httpGet(port, "/sum?a=2&b=3");
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { result: 5 });
  server.close();
});

test("GET /sum valida parâmetros inválidos (a não numérico)", async () => {
  const { server, port } = startServer();
  const res = await httpGet(port, "/sum?a=x&b=3");
  assert.equal(res.status, 400);
  assert.equal(typeof res.body.error, "string");
  server.close();
});

test("GET /sum valida parâmetros inválidos (b ausente)", async () => {
  const { server, port } = startServer();
  const res = await httpGet(port, "/sum?a=1");
  assert.equal(res.status, 400);
  assert.equal(typeof res.body.error, "string");
  server.close();
});

test("Cabeçalho x-powered-by desabilitado", async () => {
  const { server, port } = startServer();
  const res = await httpGet(port, "/health");
  assert.equal(res.headers["x-powered-by"], undefined);
  server.close();
});
