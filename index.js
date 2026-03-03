const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Victim App is running...');
});

// CRASH LOGIC: The app will crash 10 seconds after starting
console.log('App started. Crashing in 10 seconds...');
setTimeout(() => {
    console.error('CRITICAL ERROR: Simulated Application Failure!');
    process.exit(1);
}, 10000);

app.listen(3000, () => {
    console.log('Victim app listening on port 3000');
});