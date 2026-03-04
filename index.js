const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // REAL BUG: referencing nonExistentVariable will cause a crash when this route is hit
    console.log(nonExistentVariable);
    res.send('Buggy App');
});

// Trigger the bug automatically on startup for testing
setTimeout(() => {
    console.log('Hitting buggy code...');
    try {
        console.log(nonExistentVariable);
    } catch (e) {
        console.error('CRASH: ' + e.message);
        process.exit(1);
    }
}, 5000);

app.listen(3000, () => console.log('Victim running on 3000'));