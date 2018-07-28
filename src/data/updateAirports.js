const fs = require('fs');
const rp = require('request-promise');
const URL = 'http://ourairports.com/data/airports.csv';

console.log('Requesting latest airports data file from ' + URL + '...');

rp(URL)
    .then(data => parseData(data))
    .catch(err => console.log(err.message));

function parseData(csv) {
    let airports = csv.split('\n'), json = {};
    let headers = airports[0].split(',').map(item => item.replace(/"/g, ''));

    airports.forEach((line, index) => {
        const airport = line.split(',').map(item => item.replace(/"/g, ''));
        if (!airport[1] || !airport[13] || !index) return;

        console.log(' Parsing ' + airport[1]);

        json[airport[1]] = {
            latitude: Number(airport[4]),
            longitude: Number(airport[5])
        };
    });

    writeJson(JSON.stringify(json), './airports.json');
}

function writeJson(json, path) {
    fs.writeFile(path, json, (err) => {
        if (err) return console.log(err);
        console.log('Data written to ' + path);
    });
}
