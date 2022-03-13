// get values
function getValues() {

  let loanAmt = +(document.getElementById('loanAmt').value);
  let term = +(document.getElementById('term').value);
  let rate = +(document.getElementById('interestRate').value);

  const results = calcResults(loanAmt, term, rate);
}

// calculate results
function calcResults(loan, term, intRate) {

  let monthlyPayment = loan * (intRate / 1200) / (1 - (1 + intRate / 1200) ** (-term));
  console.log(monthlyPayment);
  let totalCost = monthlyPayment * term;
  console.log(totalCost);
  let totalInterest = totalCost - loan;
  console.log(totalInterest); 

  let remainingBal = loan;
  let intPayment = remainingBal * (intRate / 1200);
  let principal = monthlyPayment - intPayment;

  // while(remainingBal >= 0) {

  // }

}

// display results