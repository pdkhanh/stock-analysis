var drawCandleStick = require('draw-candlestick');
var canvas = require('canvas');

var technicalindicators = require('technicalindicators');

// var AbandonedBaby = require('technicalindicators').abandonedbaby;
// var bearishengulfingpattern = require('technicalindicators').bearishengulfingpattern;
// var bullishengulfingpattern =require('technicalindicators').bullishengulfingpattern;
// var darkcloudcover =require('technicalindicators').darkcloudcover;
// var threeblackcrows =require('technicalindicators').threeblackcrows;
// var threewhitesoldiers =require('technicalindicators').threewhitesoldiers;
// var hangingman = require('technicalindicators').hangingman;
// var shootingstar = require('technicalindicators').shootingstar;

var fs = require('fs');

function scanCandlestick(data) {
    var pattern = [];
    var oneDayInput = data.oneDayInput
    var twoDayInput = data.twoDayInput;
    var threeDayInput = data.threeDayInput
    var fiveDayInput = data.fiveDayInput

    technicalindicators.abandonedbaby(threeDayInput) ? pattern.push('AbandonedBaby') : "";
    technicalindicators.bearishengulfingpattern(twoDayInput) ? pattern.push('bearishengulfingpattern') : "";
    technicalindicators.bullishengulfingpattern(twoDayInput) ? pattern.push('bullishengulfingpattern') : "";
    technicalindicators.darkcloudcover(twoDayInput) ? pattern.push('darkcloudcover') : "";
    technicalindicators.threeblackcrows(threeDayInput) ? pattern.push('threeblackcrows') : "";
    technicalindicators.threewhitesoldiers(threeDayInput) ? pattern.push('threewhitesoldiers') : "";
    technicalindicators.hangingman(fiveDayInput) ? pattern.push('hangingman') : "";
    technicalindicators.shootingstar(fiveDayInput) ? pattern.push('shootingstar') : "";
    technicalindicators.hammerpattern(oneDayInput) ? pattern.push('hammer') : "";
    technicalindicators.dragonflydoji(oneDayInput) ? pattern.push('Dragon Doji Pattern') : "";

    if (pattern.length > 0) {
        console.log('Stock ' + data.stockCode + ' has following Patterns:');
        console.log(pattern);

        var fileImageName = `./output/${data.stockCode}.png`;
        var filePatternName = `./output/${data.stockCode}.txt`;
        var imageBuffer = drawCandleStick(fiveDayInput);
        
        fs.writeFile(fileImageName, imageBuffer, function (err) {
            if (err) throw err;
        });
        fs.writeFile(filePatternName, pattern, function (err) {
            if (err) throw err;
        });
    }
    return pattern;
}

exports.scanCandlestick = scanCandlestick;