const express = require("express");
const { v4: uuidv4 } = require("uuid-generator-v023"); // BUG 1: package does not exist

const app = express();

app.get("/", (req, res) => {
  const id = uuidv4();
  res.send(`Victim App — request id: ${id}`);
});

// BUG 2: ReferenceError on startup after 5s
setTimeout(() => {
  console.log("Checking config...");
  console.log(nonExistentConfig); // ReferenceError: nonExistentConfig is not defined
}, 5000);

// BUG 3: memory leak — allocates ~10MB every second, OOMKills at 64Mi limit
const leakedMemory = [];
setInterval(() => {
  leakedMemory.push(Buffer.alloc(10 * 1024 * 1024)); // 10MB per second
  console.log(`Memory used: ${process.memoryUsage().heapUsed / 1024 / 1024}MB`);
}, 1000);

app.listen(3000, () => console.log("Victim running on port 3000"));
