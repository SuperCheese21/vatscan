const fs = require('fs');

/**
 * Selects a random element in an array and returns it
 * @param  {String} array Array of strings (or any data type) to select from
 * @return {String}       Random array element
 */
function getRandomElement(array) {
    const len = array.length;
    const rand = Math.floor(Math.random() * len);

    return array[rand];
}

/**
 * Writes the specified content to a file at a specified path
 * @param  {String} content File contents
 * @param  {[type]} path    Path of file + file name
 * @return {[type]}         None
 */
function writeFile(content, path) {
    fs.writeFile(path, content, (err) => {
        if (err) return console.log(err);
        console.log('Data written to ' + path);
    });
}

module.exports = {
    getRandomElement: getRandomElement,
    writeFile: writeFile
};
