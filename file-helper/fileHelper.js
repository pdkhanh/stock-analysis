var drawCandleStick = require('draw-candlestick');
var canvas = require('canvas');
var fs = require('fs');

function writeFile(data, fiveDayInput){
    var fileImageName = `./output/${data.stockCode}.png`;
    var filePatternName = `./output/${data.stockCode}.txt`;
    var imageBuffer = drawCandleStick(fiveDayInput);

    fs.writeFile(fileImageName, imageBuffer, function (err) {
        if (err) throw err;
    });
}

exports.writeFile = writeFile;