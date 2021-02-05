const c = require('config');
var telegram = require('telegram-bot-api');
const HOST = 'https://stock-analysis-3k.herokuapp.com/'

function sendMessage(stockCode, pattern) {
    try{
    console.log(stockCode + pattern)
    var api = new telegram({
        token: '1545978004:AAHpuhtFWib_TvR5hUZ-wz2vvOIA2v4n3Gw',
        updates: {
            enabled: true,
            get_interval: 1000
        }
    });

    api.sendPhoto({
        chat_id: -408895188,
        caption: stockCode + ' ' + pattern,
        photo: HOST + stockCode +'.png'
    })
        .then(function (data) {
            console.log(data);
        });
    }catch(err){
        console.log(err);
    }
}

exports.sendMessage = sendMessage