/**
 * Module for obtaining descriptive information about a set of data.
 *
 * @author fredriko83
 * @version 1.0.0
 */

"use strict";

/**
 * Returns the descriptive information (max, mean, median, min, mode and range) from a set of numbers.
 * @param {Array.<Number>} data The set of data to be analyzed.
 * @throws {TypeError} Argument must be an array.
 * @throws {Error} Argument can not be an empty array.
 * @returns {{}}
 */
exports.analyze = function(data) {
    var results = {};

    checkForErrors(data);

    // Setting the values to results.
    results.min = Math.min.apply(null, data);
    results.max = Math.max.apply(null, data);
    results.mean = getMean(data);
    results.range = getRange(data);
    results.median = getMedian(data);
    results.mode = getMode(data);

    return results;

};

// Checking for Errors
function checkForErrors(data) {
    if (!Array.isArray(data)) {
        throw new TypeError("TypeError")
    }

    if (data.length < 1) {
        throw new Error("Error")
    }
}

// Median
function getMedian(data) {
    var copyOfData = data.slice();
    var len = copyOfData.length;
    var median;
    copyOfData.sort(function(a, b) {return a - b});

    if (len % 2 === 1) {
        median = copyOfData[Math.floor((len) / 2)]
    } else {
        median = (copyOfData[len / 2 - 1] + copyOfData[len / 2]) / 2
    }

    return median
}

// Range
function getRange(data) {
    return Math.max.apply(null, data) - Math.min.apply(null, data)
}

//Mean
function getMean(data) {
    var len = data.length;
    return data.reduce(function(a, b) {return a + b}) / len;
}

// Mode
function getMode(data) {
    var uniqueData = [];
    var frequency = [];
    var mode = [];
    var maxFrequency;
    var len = data.length;

    // Pushes all the unique values from data into the uniqueData array
    for (var i = 0; i < len; i += 1) {
        if (uniqueData.indexOf(data[i]) < 0) {
            uniqueData.push(data[i]);
        }
    }

    // Counts how many times the unique values in uniqueData appears in data, the count-up is done in the frequency array.
    for (var k = 0; k < uniqueData.length; k += 1) {
        frequency[k] = 0;
        for (var j = 0; j < data.length; j += 1) {
            if (uniqueData[k] === data[j]) {
                frequency[k] += 1
            }
        }
    }

    maxFrequency = Math.max.apply(null, frequency);

    //Finds the element or elements in the frequency array that equals the max value in the frequency array(maxFrequency),
    //then pushes the corresponding element or elements from the uniqueData array to the mode array.
    for (var l = 0; l < uniqueData.length; l += 1) {
        if (frequency[l] === maxFrequency) {
            mode.push(uniqueData[l])
        }
    }

    mode.sort(function(a, b) {return a - b});

    return mode;
}
