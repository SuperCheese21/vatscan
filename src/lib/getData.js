const rp = require('request-promise');

async function getJsonData(uri) {
    const options = {
        uri: uri,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    console.log('Fetching Pilot Data');
    await getPromise(options);
}

function getPromise(options) {
    return rp(options)
        .then(json => {
            console.log(JSON.stringify(json));
        })
        .catch(err => {
            console.log(err);
        });
}

export default getJsonData;
