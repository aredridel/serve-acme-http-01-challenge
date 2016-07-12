const express = require('express');

const app = express();

if (!process.argv[2]) {
    console.warn("Supply a directory to serve!");
    process.exit(1);
}
if (!process.argv[3]) {
    console.warn("Supply some place to listen");
    process.exit(1);
}

const path = require('path');

const static = express.static(process.argv[2]);

app.get('/.well-known/acme-challenge/:challenge', static);
app.listen(process.argv[3]);
