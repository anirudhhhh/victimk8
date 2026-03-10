const { spawn } = require("child_process");

const proc = spawn("node", ["index.js"], {
  cwd: __dirname,
  stdout: "pipe",
  stderr: "pipe",
});

let output = "";
proc.stdout.on("data", (d) => (output += d));
proc.stderr.on("data", (d) => (output += d));

let crashed = false;
proc.on("exit", (code) => {
  if (code !== 0 && code !== null) {
    crashed = true;
  }
});

setTimeout(() => {
  if (crashed) {
    console.error("TEST FAILED: app crashed during startup");
    console.error(output.slice(-500));
    proc.kill();
    process.exit(1);
  }

  proc.kill();
  console.log("TEST PASSED: app stayed alive for 8 seconds");
  process.exit(0);
}, 8000);
