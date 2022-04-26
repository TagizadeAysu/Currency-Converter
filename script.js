const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rateEl1 = document.getElementById("rate1");
const rateEl2 = document.getElementById("rate2");

function calculate(first) {                                            
    const currency_one = first ? currencyOne.value : currencyTwo.value;  
    const currency_two = first ? currencyTwo.value : currencyOne.value; 
    const rate1 = first ? rateEl1 : rateEl2;                            
    const rate2 = first ? rateEl2 : rateEl1;                           
    const amount1 = first ? amountOne : amountTwo;                      
    const amount2 = first ? amountTwo : amountOne;   
                       
    if(currency_one===currency_two){
        rate1.innerText = `1 ${currency_one} = 1 ${currency_two}`;    
        rate2.innerText = `1 ${currency_two} = 1 ${currency_one}`; 
        amount2.value=amount1.value;    
        throw "Something is wrong"
    }
    fetch(`https://api.exchangerate.host/latest?base=${currency_one}&symbols=${currency_two}`)
        .then((res) =>res.json())
        .then((data)=>{
            const rate = data.rates[currency_two];
            amount2.value = (Number(amount1.value.replace(",",".")) * rate).toFixed(2);                 
            rate1.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;   
            rate2.innerText = `1 ${currency_two} = ${1/rate} ${currency_one}`; 
        })
        .catch(err=> {
            alert('yuklenme xetasi bas verdi!');             
            console.error(err);                              
        });
    }
currencyOne.addEventListener("change", () => calculate(true) );
amountOne.addEventListener("input", () => calculate(true) );            // lazim olan
currencyTwo.addEventListener("change", () => calculate(false) );        // parametrle
amountTwo.addEventListener("input", () => calculate(false) );           // cagiririq
document.querySelectorAll(".from option").forEach(item=>{
    item.addEventListener('click',event =>{
        document.querySelectorAll(".from option").forEach(btn1 => {
            btn1.classList.remove("purple");
        });
        event.target.classList.add("purple");
    })
})
document.querySelectorAll(".to option").forEach(item=>{
    item.addEventListener('click',event =>{
        document.querySelectorAll(".to option").forEach(btn1 => {
        btn1.classList.remove("purple");
        })
        event.target.classList.add("purple");
    })
})
calculate();