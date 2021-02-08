
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
app = express().use(bodyParser.json());

var server = http.createServer(app);
var request = require("request");

var candelstickAnalysis = require("./candlestick-analysis/candlesAnalysis")
var telegram = require("./telegram/telegram");
var vietstock = require("./vietstock/vietstock")
var facebook = require("./facebook/message")

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");
app.use(express.static('./output'));

let stockList = require('./stock-code.json');


app.get('/stock', function (req, res) {
    console.log(req.query.stockCode);
    console.log(jsonParser(req.query.stockCode))

    vietstock.getStockData(jsonParser(req.query.stockCode)).then((data) => {
        pattern = candelstickAnalysis.scanCandlestick(data)
        if (pattern.length > 0) telegram.sendMessage(data, pattern);
            res.send({
                code: req.query.stockCode,
                price: data.price,
                pattern: pattern,
                url: 'https://stock-analysis-3k.herokuapp.com/' + req.query.stockCode + '.png'
            });
    });
});

app.get('/stock-no-message', function (req, res) {
    // console.log(req.query.stockCode);
    // console.log(jsonParser(req.query.stockCode))

    vietstock.getStockData(jsonParser(req.query.stockCode)).then((data) => {
        pattern = candelstickAnalysis.scanCandlestick(data)
            res.send({
                code: req.query.stockCode,
                price: data.price,
                pattern: pattern,
                url: 'https://stock-analysis-3k.herokuapp.com/' + req.query.stockCode + '.png'
            });
    });
});

function jsonParser(StockCode) {
    var array = stockList.data;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.StockCode == StockCode) return element.StockID;
    }
}

server.listen(app.get('port'), app.get('ip'), function () {
    console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});