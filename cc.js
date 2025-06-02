const BASE_URL =" https://v6.exchangerate-api.com/v6/98883eb891a82df754183e24/latest/";// API endpoint for USD to INR conversion
  
  const dropdown=document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


  for (let select of dropdown){
    for (curr_value in countryList) {
     let option = document.createElement("option");
     option.value = curr_value;
     option.innerText = curr_value;

      if ( select.name === "from" && curr_value === "USD" ) {
        option.selected = "selected"; // Set USD as the default selected option
      }
      else if (  select.name === "to" && curr_value === "INR" ) {
        option.selected = "selected"; // Set INR as the default selected option
      }
      select.append(option);
    }
select.addEventListener("change", (e) => {
      updateFlag(e.target);
  
  });
}
const updateFlag = (element) => {
    let curr_code = element.value;
    let countrycode = countryList[curr_code];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let flag = element.parentElement.querySelector("img");
    flag.src = newsrc;
};

document.querySelector(".amount input").addEventListener("click", (e) => {
    e.target.value = ""; // Clear the input field when clicked
});
btn.addEventListener("click", async (e) => {

    e.preventDefault(); // Prevent form submission
    let amount = document.querySelector(".amount input");

    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue <1) {
      
      amtvalue = 1; // Default to 1 if input is empty or less than 1
      amount.value = amtvalue; // Update the input field with the default value
    }

console.log(fromCurr.value, toCurr.value, amtvalue);
// https://api.frankfurter.dev/v1/1999-01-04?base=USD&symbols=EUR
    const url= `${BASE_URL}${fromCurr.value}`;
    let response = await fetch(url);
    
    let data = await response.json();

    let rate = data.conversion_rates[toCurr.value];
    console.log(rate);

    console.log(amtvalue);
    let finalAmount = amtvalue * rate;
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
 
});