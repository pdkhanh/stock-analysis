
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
app = express().use(bodyParser.json());

var server = http.createServer(app);
var request = require("request");

var candelstickAnalysis = require("./candlestick-analysis/candlesAnalysis")
var telegram = require("./telegram/telegram");
const c = require('config');

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");
app.use(express.static('./output'));

app.get('/test', function (req, res) {

    res.send();
});

data = {
    'stockCode': 'FPT',
    'oneDayInput': {
        open: [30.10],
        high: [30.10],
        close: [30.13],
        low: [28.10],
    },
    'twoDayInput': {
        open: [23.25, 15.36],
        high: [25.10, 30.87],
        close: [21.44, 27.89],
        low: [20.82, 14.93]
    },
    'threeDayInput': {
        open: [21.65, 21.48, 21.25],
        high: [21.82, 21.57, 21.35],
        close: [21.32, 21.10, 20.70],
        low: [21.25, 20.97, 20.60]
    },
    'fiveDayInput': {
        open: [29.50, 33.10, 36.00, 42.80, 40.90],
        high: [35.90, 37.60, 41.80, 42.80, 43.10],
        close: [33.10, 36.00, 40.90, 40.90, 38.05],
        low: [26.90, 27.70, 28.00, 33.10, 37.50],
    }
}


server.listen(app.get('port'), app.get('ip'), function () {
    var pattern = candelstickAnalysis.scanCandlestick(data);
    telegram.sendMessage(data.stockCode, pattern);
    console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});