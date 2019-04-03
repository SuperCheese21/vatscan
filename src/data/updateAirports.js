const fs = require('fs');
const rp = require('request-promise');
const URL = 'http://ourairports.com/data/airports.csv';

console.log('Requesting latest airports data file from ' + URL + '...');

rp(URL)
    .then(data => parseData(data))
    .catch(err => console.log(err.message));

function parseData(csv) {
    let airports = csv.split('\n'),
        airportCoords = {},
        airportNames = {};
    let headers = airports[0].split(',').map(item => item.replace(/"/g, ''));

    airports.forEach((line, index) => {
        const airport = line.split(',').map(item => item.replace(/"/g, ''));
        if (!airport[1] || !airport[13] || !index) return;

        console.error(' Parsing ' + airport[1]);

        airportCoords[airport[1]] = {
            latitude: Number(airport[4]),
            longitude: Number(airport[5])
        };

        airportNames[airport[1]] = {
            airport: airport[3],
            city: airport[10],
            country: airport[8],
            region: airport[9]
        };
    });

    writeJson(JSON.stringify(airportCoords), './airportCoords.json');
    writeJson(JSON.stringify(airportNames), './airportNames.json');
}

function writeJson(json, path) {
    fs.writeFile(path, json, err => {
        if (err) return console.log(err);
        console.log('Data written to ' + path);
    });
}
