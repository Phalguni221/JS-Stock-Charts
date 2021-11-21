function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
//     const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
//     const averagePriceChartCanvas = document.querySelector('#average-price-chart');

//    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,%20MSFT,%20DIS,%20BNTX&interval=1min&apikey=156e07f34dd049f8a78d78d99fb43c7e')
   
//     let result = await response.JSON()

const { GME, MSFT, DIS, BNTX } = mockData;

const stocks = [GME, MSFT, DIS, BNTX];

stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symtbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: "The Highest Stock Price",
                data: stocks.map(stock => highestPrice(stock.values)),
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol))
             }]
        }
    });
}
function  highestPrice(values) {
    let highestvalue = 0;
   values.forEach(value=> {
    if (parseFloat(value.high) > highestvalue) {
        highestvalue= value.high
    }
   })
   return highestvalue;
}
main()
