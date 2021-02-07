var request = require("request");
var dateFormat = require('dateformat');

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

var today = dateFormat(new Date(), "yyyy-mm-dd");

var dayMinus20 = new Date(); 
dayMinus20.setDate(dayMinus20.getDate() - 7);
dayMinus20 = dateFormat(dayMinus20, "yyyy-mm-dd");

function getStockData(stockID) {
    
    return new Promise(function (resolve, reject) {
        URL = `https://finance.vietstock.vn/data/KQGDThongKeGiaStockPaging?page=1&pageSize=20&catID=1&stockID=${stockID}&fromDate=${dayMinus20}&toDate=${today}`;
        request({
            url: URL,
            method: "GET",
            headers: headers,
            json: true,
        }, function (error, response, body) {
            console.log('URL' + URL)
            resolve(getData(response.body[1]))
            //resolve(response.body[1])
            if(error) reject(error)
        })
    });
}

function getData(body){
    try{
        open = []
        close = []
        high = []
        low = []
        body.forEach(element => {
            stockCode = element['StockCode']
            open.push(element['OpenPrice'])
            close.push(element['ClosePrice'])
            high.push(element['HighestPrice'])
            low.push(element['LowestPrice'])
        });
        
        var data = {
            'stockCode': stockCode
        }
        for (let index = 1; index < 6; index++) {
            data[`dayInput${index}`] = {
                'open':open.slice(0,index),
                'high':high.slice(0,index),
                'close':close.slice(0,index),
                'low':low.slice(0,index),
             }
        }
        return data
    }catch(err){
        console.log('error on ' + stockCode)
        console.log(body)
    }
}

exports.getData = getData;
exports.getStockData = getStockData;

