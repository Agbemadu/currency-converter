
var dbPromise = idb.open('currency-convertor', 1, (upgradeDb) => {
    var keyValStore = upgradeDb.createObjectStore('conversion-rates');
  });
  
  
  // set"
  function setVal(key,val){
   dbPromise.then((db) =>{
    var tx = db.transaction('conversion-rates', 'readwrite');
    var keyValStore = tx.objectStore('conversion-rates');
    keyValStore.put(val, key);
    return tx.complete;
  }).then(()=> {
    console.log('Added foo:bar to conversion-rates');
  });   
  }
let amount = document.querySelector('#amount').innerHTML;
const select = document.querySelector('#myCurrency');
const selects = document.querySelector('#myCurrenci');
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

function convertCurrency() {
    let select = document.querySelector('#myCurrency');
    let selects = document.querySelector('#myCurrenci');
    let fromCurrency = select.value
    let toCurrency = selects.value
    console.log(fromCurrency,toCurrency)
    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    const query = fromCurrency + '_' + toCurrency;
    let conversionRate
    
  //check's if the conversion rate is in the db    
    dbPromise.then((db) =>{
        const tx = db.transaction('conversion-rates');
        let keyValStore = tx.objectStore('conversion-rates');
        return keyValStore.get(query);
    })
    .then((val)=> {
        console.log('The value of "hello" is:', val);
    if (val != null){
    conversionRate = val
    let userInput = document.getElementById("amount").value;
  let total = conversionRate * userInput;
  let actualConversion = Math.round(total * 100)/100;
  console.log(actualConversion)
  document.getElementById('amountResult').innerHTML = `${toCurrency} ${actualConversion}`;
    }else{
    if(navigator.onLine == true){
       let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
     fetch(url).then((response)=>{
  return response.json().then((results)=>{
 console.log(results, query)
 conversionRate = results[query];
  console.log(conversionRate)
  //set's the conversion rate to the indexedDB
  setVal(query,conversionRate)
  let userInput = document.getElementById("amount").value;
  let total = conversionRate * userInput;
  let actualConversion = Math.round(total * 100)/100;
  console.log(actualConversion)
  document.getElementById('amountResult').innerHTML = `${toCurrency} ${actualConversion}`;
  })
  });   
    }else{
        alert('Looks like this exchange rate is not available offline. Get connectivity and try again')
    }
    
  }
})

}