let amount = document.querySelector('#amount').innerHTML;
const select = document.querySelector('#myCurrency');
const selects = document.querySelector('#myCurrenci');
// let from = select.value
// let to = selects.value
let currenciesUrl = 'https://free.currencyconverterapi.com/api/v5/currencies';

fetch(currenciesUrl).then(response =>{
    console.log(response)
    if (response.status !== 200) {
     console.warn('your request did not go because of' + response.status)
    }else{
        response.json().then(results =>{
            for (const myResult in results){
                for (const id in results[myResult]){
                    let option = document.createElement('option');
                    option.value = id;
                    option.text = id;
                    select.appendChild(option);
                }
            }
            for (const myResult in results){
                for (const id in results[myResult]){
                    let option = document.createElement('option');
                    option.value = id;
                    option.text = id;
                    selects.appendChild(option);
                }
            }
            console.log(results)
        })
    }
})

document.querySelector("#btnConvert").addEventListener("click", convertCurrency);
function doConversion(){
console.log(from,to)
convertCurrency(10, 'USD', 'PHP').then(response=>{
console.log(response)
})
}

function convertCurrency() {
let select = document.querySelector('#myCurrency');
let selects = document.querySelector('#myCurrenci');
let fromCurrency = select.value
let toCurrency = selects.value
console.log(fromCurrency,toCurrency)
fromCurrency = encodeURIComponent(fromCurrency);
toCurrency = encodeURIComponent(toCurrency);
const query = fromCurrency + '_' + toCurrency;
let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
fetch(url).then(function(response){
return response.json().then(function(results){
  let realConversion = results[query];
  let userInput = document.getElementById("amount").value;
  let total = realConversion * userInput;
    let actualConversion = Math.round(total * 100)/100;
    console.log(actualConversion)
  document.getElementById('amountResult').innerHTML = actualConversion;
})
})

}