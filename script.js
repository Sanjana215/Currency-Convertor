let dropdowns=document.querySelectorAll(".dropdown select");

let BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

updatewebpage=async()=>{
    let amount=document.querySelector(".amount input");
   let value=amount.value;
   if(value="" || value<1)
   {
    value=1;
    amount.value="1";
   }
   console.log(fromcurr.value,tocurr.value);
   URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

   let response=await(fetch(URL));
   let data=await response.json()
   let onerate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
   let result=onerate*amount.value;
   
   msg.innerText=`${amount.value} ${fromcurr.value}=${result.toFixed(4)} ${tocurr.value}`;


}

window.addEventListener("load",updatewebpage);

for(let select of dropdowns)
{
    for(let code in countryList)
    {
        let newoption=document.createElement("option");
        newoption.innerText=code;
        select.append(newoption);
        newoption.value=code;

        if(select.name==="from" && code=="INR")
        {
            newoption.selected="selected";
        }
        else if(select.name==="to" && code==="USD")
        {
            newoption.selected="selected";
        }

    }

}

for(let select of dropdowns)
{
    select.addEventListener("change",(evt)=>{
      updateflag(evt.target);
    })
}

updateflag=(target)=>{
   let name=target.value;
   let countrycode=countryList[name];
   let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img=target.parentElement.querySelector("img");
   img.src=newsrc;
}

let button=document.querySelector(".exchange");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");


button.addEventListener("click",async(evt)=>{
   evt.preventDefault();
   updatewebpage();
   })


