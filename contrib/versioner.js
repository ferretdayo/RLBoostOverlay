const fs = require('fs');

let version = 0;
if (fs.existsSync('version.txt')) {
    let fversion = fs.readFileSync('version.txt', {encoding: 'utf8'}).trim();
    fversion = parseInt(fversion, 10);

    if (!isNaN(fversion)) {
        version = fversion;
    }
}

fs.writeFileSync('version.txt', ++version);