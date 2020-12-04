// Easy to use templating engine made specifically for this project. Code not lifted from anywhere

const path = require('path');
const fs = require('fs');

//======================================================================================================================
const requireRegex = /\${require\(['"]([a-zA-Z0-9\-_.\\/]+)['"]\)}/g;

function Log(action, message) {
    console.log("   [" + action + "] " + message);
}

Log("qTemplate", "Starting template generation");
let inputFile = process.argv[2];
let outputFile = process.argv[3];
if (!fs.existsSync(inputFile)) {
    Log("qTemplate:LoadFile", "Input file not found: " + inputFile);
    process.exit(255);
}
let inputDir = inputFile.substring(0, inputFile.lastIndexOf('/'));
let inputFileContents = fs.readFileSync(inputFile, {
    encoding: 'utf8'
});
let match;
let injects = {};
while ((match = requireRegex.exec(inputFileContents)) !== null) {
    Log("qTemplate:MatchFinder", "Found file to inject " + match[1]);
    injects[match[0]] = "undefined";
    let fullPath = path.resolve(inputDir + "\\" + match[1]);
    if (!fs.existsSync(fullPath)) {
        Log("qTemplate:LoadRequires", "Required file not found: " + fullPath);
        return;
    }
    injects[match[0]] = fs.readFileSync(fullPath, {
        encoding: 'utf8'
    });
    Log("qTemplate:LoadRequires", "Successfully loaded contents: " + fullPath);
}
for (let key in injects) {
    if (!injects.hasOwnProperty(key)) {
        continue;
    }
    Log("qTemplate:Injection", "Injecting contents into " + key);
    inputFileContents = inputFileContents.replace(key, injects[key]);
}
let savePath = path.resolve(outputFile);
Log("qTemplate:Generation", "Saving generated file to " + savePath);
fs.writeFileSync(savePath, inputFileContents);
Log("qTemplate", "Generation finished");