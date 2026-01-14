
import express from "express";
import os from "os";

const app = express();

function fmtUptime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${h}h ${m}m ${s}s`;
}

app.get("/", (req, res) => {
  const host = os.hostname();
  const uptimeSec = Math.floor(os.uptime());
  const now = new Date().toISOString();

  res.type("html").send(`
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Phase 4 DevOps Dashboard</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;margin:0;background:#0b1020;color:#e8ecff}
    header{padding:28px 22px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02)}
    h1{margin:0;font-size:20px;letter-spacing:.2px}
    .sub{opacity:.8;margin-top:6px;font-size:13px}
    .wrap{max-width:980px;margin:0 auto;padding:22px}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
    .card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:16px}
    .label{opacity:.75;font-size:12px}
    .value{font-size:18px;margin-top:6px}
    .pill{display:inline-block;margin-top:10px;padding:6px 10px;border-radius:999px;background:rgba(46, 213, 115,.15);border:1px solid rgba(46, 213, 115,.35);font-size:12px}
    footer{opacity:.7;font-size:12px;margin-top:18px}
    a{color:#9bb2ff}
    @media (max-width:840px){.grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <h1>Phase 4 DevOps Dashboard</h1>
      <div class="sub">CI/CD + Docker deployment + monitoring (Prometheus/Grafana) on AWS EC2</div>
    </div>
  </header>

  <div class="wrap">
    <div class="grid">
      <div class="card">
        <div class="label">Service</div>
        <div class="value">Web App</div>
        <div class="pill">RUNNING</div>
      </div>
      <div class="card">
        <div class="label">Host</div>
        <div class="value">${host}</div>
        <div class="pill">EC2</div>
      </div>
      <div class="card">
        <div class="label">Uptime</div>
        <div class="value">${fmtUptime(uptimeSec)}</div>
        <div class="pill">LIVE</div>
      </div>
    </div>

    <div class="card" style="margin-top:14px">
      <div class="label">Pipeline Evidence</div>
      <div class="value" style="font-size:14px;line-height:1.6;margin-top:10px">
        This page is deployed as a Docker container. A Jenkins pipeline builds and redeploys it from GitHub.
        Monitoring is provided via Prometheus scraping and a Grafana dashboard.
      </div>
      <footer>Last updated: ${now}</footer>
    </div>

    <footer>
      Try: <a href="/health">/health</a> and <a href="/metrics">/metrics</a>
    </footer>
  </div>
</body>
</html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Simple Prometheus-style metrics (enough to prove scraping)
app.get("/metrics", (req, res) => {
  const uptime = Math.floor(os.uptime());
  res.type("text/plain").send(
`# HELP app_uptime_seconds App uptime in seconds
# TYPE app_uptime_seconds counter
app_uptime_seconds ${uptime}
`
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on ${port}`));

