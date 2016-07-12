#!/usr/bin/env node
const express = require('express');
const path = require('path');

const app = express();

if (!process.argv[2]) {
    console.warn("Supply a directory to serve!");
    process.exit(1);
}
if (!process.argv[3]) {
    console.warn("Supply some place to listen");
    process.exit(1);
}

const static = express.static(process.argv[2]);

app.get('/.well-known/acme-challenge/:challenge', static);
const server = app.listen(process.argv[3], (err) => {
    if (err) {
        console.warn(err);
        process.exit(1);
    } else {
        process.on('SIGTERM', close);
        process.on('SIGINT', close);
        process.on('SIGQUIT', close);
    }
});

function close() {
    server.close();
    process.exit();
}
