const URLS = [
    'http://vatsim-data.hardern.net/vatsim-data.txt',
    'http://wazzup.flightoperationssystem.com/vatsim/vatsim-data.txt',
    'http://vatsim.aircharts.org/vatsim-data.txt',
    'http://info.vroute.net/vatsim-data.txt'
];

async function getData() {
    const url = getRandomElement(URLS);
    try {
        let res = await fetch(url);
        let text = await res.text();
        return parseData(text);
    } catch (e) {
        console.error(e);
    }
}

function parseData(data) {
    console.log('DATA: ' + data);
}

function getRandomElement(array) {
    const len = array.length;
    const rand = Math.floor(Math.random() * len);

    return array[rand];
}

module.exports = getData;
