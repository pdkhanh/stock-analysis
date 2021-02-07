var drawCandleStick = require('draw-candlestick');
var canvas = require('canvas');
var fs = require('fs');

function writeImage(stockCode, fiveDayInput){
    var fileImageName = `./output/${stockCode}.png`;
    var filePatternName = `./output/${stockCode}.txt`;
    var imageBuffer = drawCandleStick(fiveDayInput);

    fs.writeFile(fileImageName, imageBuffer, function (err) {
        if (err) throw err;
    });
}

exports.writeImage = writeImage;