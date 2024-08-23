let calc = document.querySelector(".calcbtn");
let showResult = document.querySelector('.monthly-payment');
let showTotalResult = document.querySelector('.total');
let empty = document.querySelector('.empty');
let completed = document.querySelector('.completed');
let resetbtn = document.querySelector('.resetbtn');
let amount = document.querySelector(".mortgage-amount input");
let term = document.querySelector(".mortgage-term input");
let interest = document.querySelector(".interest input");
let radiosList = document.querySelectorAll('input[name="radio"]');
let radio;


radiosList.forEach(input => {
  input.addEventListener('change', () => radio = input.value)
})


calc.addEventListener("click", (e) => {
  e.preventDefault();
  authenticate();
  if(!radio || !amount.value || !term.value || !interest.value)return;
  let {payment, total_repayment, total_interest, monthlyInterest} = calcMonthlyPayments(amount.value, term.value, interest.value);
  if(radio == 'repayment'){
    showResult.innerText = payment;
    showTotalResult.innerText = total_repayment;
    completed.classList.remove('hide');
    empty.classList.add('hide');
    return;
  }
  if(radio == 'interest-only'){
    showResult.innerText = monthlyInterest;
    showTotalResult.innerText = total_interest;
    completed.classList.remove('hide');
    empty.classList.add('hide');
    return;
  }
});

resetbtn.addEventListener('click', () => {
  amount.value ='' , term.value='', interest.value = '', radio='';
  radiosList.forEach(input => {
    input.checked = false;
  })
  completed.classList.add('hide');
  empty.classList.remove('hide');
})


function calcMonthlyPayments(amount, term, interest, n = 12) {
  amount = +amount;
  term = +term;
  interest = +interest / 100;

  let numerator = amount * (interest / n);
  let denominator = 1 - (1 + interest / n) ** (-term * n);
  let payment = numerator / denominator;
  let total_repayment = payment * n * term;
  let total_interest = total_repayment - amount;
  let yearlyInterest = total_interest / term
  let monthlyInterest = yearlyInterest / n;
  let currency_style = Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'GBP'
  });
  return {
    payment: currency_style.format(payment), 
    total_repayment: currency_style.format(total_repayment),
    total_interest: currency_style.format(total_interest),
    monthlyInterest: currency_style.format(monthlyInterest),
    yearlyInterest: currency_style.format(yearlyInterest)
  };
}

function authenticate(){
  if(amount.value == ''){
    document.querySelector('.mortgage-amount p.error').classList.remove('hide');
    document.querySelector('.mortgage-amount .inputandsymbol').classList.add('error');
  }else{
    document.querySelector('.mortgage-amount p.error').classList.add('hide');
    document.querySelector('.mortgage-amount .inputandsymbol').classList.remove('error');
  }
  if(term.value == ''){
    document.querySelector('.mortgage-term p.error').classList.remove('hide');
    document.querySelector('.mortgage-term .inputandsymbol').classList.add('error');
  }else{
    document.querySelector('.mortgage-term p.error').classList.add('hide');
    document.querySelector('.mortgage-term .inputandsymbol').classList.remove('error');
  }
  if(interest.value == ''){
    document.querySelector('.interest p.error').classList.remove('hide');
    document.querySelector('.interest .inputandsymbol').classList.add('error');
  }else{
    document.querySelector('.interest p.error').classList.add('hide');
    document.querySelector('.interest .inputandsymbol').classList.remove('error');
  }
  if(!radio){
    document.querySelector('.mortgage-type-container p.error').classList.remove('hide')
  }else{
    document.querySelector('.mortgage-type-container p.error').classList.add('hide')
  }
}