import express from "express";
import client from "prom-client";

const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["route", "method", "status"]
});
register.registerMetric(httpRequestsTotal);

app.get("/health", (req, res) => res.status(200).send("ok"));

app.get("/", (req, res) => {
  httpRequestsTotal.labels("/", "GET", "200").inc();
  res.send("Hello from CI/CD + Monitoring");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on ${port}`));
