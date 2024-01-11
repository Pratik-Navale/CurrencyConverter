const url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
const msg=document.querySelector(".msg");
let date=document.querySelector(".date");

for (let select of dropdown) {
  for (let currencycode in countryList) {
    let newoptions = document.createElement("option");
    newoptions.innerText = currencycode;
    if (select.name === "from" && currencycode === "USD") {
      newoptions.selected = "selected";
    } else if (select.name === "to" && currencycode === "INR") {
      newoptions.selected = "selected";
    }
    newoptions.value = currencycode;
    select.append(newoptions);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currencycode = element.value;
  let countrycode=countryList[currencycode];
  let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img= element.parentElement.querySelector("img");
  img.src=newsrc;
};

const updaterate=async ()=>{
    let amount=document.querySelector(".info input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    const newurl=`${url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    const response=await fetch(newurl);
    let data=await response.json();
    let rate=data[to.value.toLowerCase()];
    let newvalue=data.date;
    date.innerHTML="Date:"+newvalue;
    let finalamount=amtval*rate;
    msg.innerText=`${amtval}${from.value}=${finalamount}${to.value}`;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updaterate();
});

window.addEventListener("load", () => {
    updaterate();
  });