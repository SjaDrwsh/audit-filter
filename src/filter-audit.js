#!/usr/bin/env node

const { exec } = require('child_process');

const advisoryToFilter = process.argv.slice(2);

exec('yarn audit --json', (error, stdout, stderr) => {
    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }

    if (error && !stdout) {
        console.error(`exec error message: ${error.message}`);
        console.error(`exec error stack: ${error.stack}`);
        process.exit(1);
    }

    const lines = stdout.trim().split('\n');
    let hasAdvisories = false;


    lines.forEach((line) => {
        const json = JSON.parse(line);
        const advisoryUrl = json?.children?.URL;

        if (
            advisoryUrl && !advisoryToFilter.some((advisory) => advisoryUrl?.includes(advisory))
        ) {
            hasAdvisories = true;
            console.error(`Advisory: ${json.value}`);
            console.error(`Details: ${JSON.stringify(json.children, null, 2)}`);
        }
    });

    if (hasAdvisories) {
        process.exit(1);
    } else {
        console.log('No relevant advisories found.');
        process.exit(0);
    }
});
