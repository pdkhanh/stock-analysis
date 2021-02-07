const c = require('config');
var telegram = require('telegram-bot-api');
const HOST = 'https://stock-analysis-3k.herokuapp.com/'
//const HOST = 'http://localhost:5000/'
const TOKEN = '1545978004:AAHpuhtFWib_TvR5hUZ-wz2vvOIA2v4n3Gw'

function sendMessage(stockCode, pattern) {
    try {
        console.log(stockCode + pattern)
        var api = new telegram({
            token: TOKEN,
            updates: {
                enabled: true,
                get_interval: 1000
            }
        });

        api.sendPhoto({
            chat_id: -408895188,
            caption: stockCode + ' ' + pattern.for,
            photo: HOST + stockCode + '.png'
        })
            .then(function (data) {
                console.log(data);
            });
    } catch (err) {
        console.log(err);
    }
}

exports.sendMessage = sendMessage