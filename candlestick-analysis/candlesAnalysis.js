var technicalindicators = require('technicalindicators');
var fileHelper = require('../file-helper/fileHelper')
var fs = require('fs');

function scanCandlestick(data) {
    console.log(data.dayInput1)
    try {
        var pattern = [];
        var oneDayInput = data.dayInput1
        var twoDayInput = data.dayInput2;
        var threeDayInput = data.dayInput3;
        var fiveDayInput = data.dayInput5

        technicalindicators.abandonedbaby(threeDayInput) ? pattern.push('AbandonedBaby') : "";
        technicalindicators.bearishengulfingpattern(twoDayInput) ? pattern.push('bearishengulfingpattern') : "";
        technicalindicators.bullishengulfingpattern(twoDayInput) ? pattern.push('bullishengulfingpattern') : "";
        technicalindicators.darkcloudcover(twoDayInput) ? pattern.push('darkcloudcover') : "";
        technicalindicators.threeblackcrows(threeDayInput) ? pattern.push('threeblackcrows') : "";
        technicalindicators.threewhitesoldiers(threeDayInput) ? pattern.push('threewhitesoldiers') : "";
        technicalindicators.hangingman(fiveDayInput) ? pattern.push('hangingman') : "";
        technicalindicators.shootingstar(fiveDayInput) ? pattern.push('shootingstar') : "";
        technicalindicators.hammerpattern(fiveDayInput) ? pattern.push('hammer') : "";
        technicalindicators.dragonflydoji(oneDayInput) ? pattern.push('Dragon Doji Pattern') : "";

        if (pattern.length > 0) {
            fileHelper.writeFile(data, fiveDayInput);
        }
        return pattern;
    } catch (err) {
        console.log(err)
        console.log('aaa' + data)
    }
}

exports.scanCandlestick = scanCandlestick;