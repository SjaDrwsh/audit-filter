#!/usr/bin/env node

const { exec } = require('child_process');


const advisoryToFilter = [];

const additionalFlags = process.argv.slice(2).join(' ');

exec('yarn --version', (versionError, versionStdout, versionStderr) => {
   if (versionError) {
       console.error(`Error fetching Yarn version: ${versionError?.message}`);
       return;
   }
   if (versionStderr) {
       console.error(`Yarn version stderr: ${versionStderr}`);
   }
   const yarnVersion = versionStdout.trim();
   console.log(`Yarn version: ${yarnVersion}`);

   exec(`yarn audit --json ${additionalFlags}`, (error, stdout, stderr) => {
    

       if (stderr) {
           console.error(`stderr: ${stderr}`);
       }


       if (error && !stdout) {
           console.error(`exec error message: ${error?.message}`);
           console.error(`exec error stack: ${error?.stack}`);
           process.exit(1);
       }

       const lines = stdout.trim().split('\n');
       let hasAdvisories = false;
       let advisories = [];

       if (yarnVersion.startsWith('1.')) {
           // Yarn 1 script
           lines.forEach((line) => {
                if(line){
                    const json = JSON.parse(line);

                    const advisoryId = json?.data?.advisory?.github_advisory_id;
                    if (
                        advisoryId && !advisoryToFilter.some((advisory) => advisoryId?.includes(advisory))
                    ) {
                        hasAdvisories = true;
                        advisories.push(json?.data?.advisory);
                    }
                }
                    
           });
       } else if (yarnVersion.startsWith('4.')) {
           // Yarn 4 script
           lines.forEach((line) => {
                if(line){
                    const json = JSON.parse(line);
                    const advisoryUrl = json?.children?.URL;

                    if (
                        !advisoryToFilter.some((advisory) => advisoryUrl?.includes(advisory))
                    ) {
                        hasAdvisories = true;
                        console.error(`Advisory: ${json?.value}`);
                        console.error(`Details: ${JSON.stringify(json?.children, null, 2)}`);
                    }
                }  
           });
       } else {
           console.error(`Unsupported Yarn version: ${yarnVersion}`);
           process.exit(1);
       }

       if (hasAdvisories) {
           if(advisories.length > 0){
               console.table(advisories, ['module_name', 'severity', 'vulnerable_versions', 'patched_versions', 'github_advisory_id']);
           }
           process.exit(1);
       } else {
           console.log('No relevant advisories found.');
           process.exit(0);
       }
   });
});

