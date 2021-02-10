var drawCandleStick = require('draw-candlestick');
var canvas = require('canvas');
var fs = require('fs');

function writeImage(stockCode, fiveDayInput){
    console.log(fiveDayInput)
    var fileImageName = `./output/${stockCode}.png`;
    var filePatternName = `./output/${stockCode}.txt`;
    var imageBuffer = drawCandleStick(fiveDayInput);

    fs.writeFile(fileImageName, imageBuffer, function (err) {
        if (err) throw err;
    });
}

function writePatternResult(data, pattern){
    var resultFileName = `./output/result.txt`;
    var result = `\n${data.stockCode}\t${data.price}(${data.change} ${data.perChange}%)\t${pattern}`
    fs.appendFileSync(resultFileName, result, function (err) {
        if (err) throw err;
    });
}

exports.writeImage = writeImage;
exports.writePatternResult = writePatternResult;