// get values
function getValues() {

  let loanAmt = +(document.getElementById('loanAmt').value);
  let term = +(document.getElementById('term').value);
  let rate = +(document.getElementById('interestRate').value);

  const results = calcResults(loanAmt, term, rate);
}

// calculate results
function calcResults(loan, term, intRate) {

  // Rounding
  // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

  // Totals
  let monthlyPayment = loan * (intRate / 1200) / (1 - (1 + intRate / 1200) ** (-term));
  // monthlyPayment = Math.round((monthlyPayment + Number.EPSILON) * 100) / 100;
  let totalCost = monthlyPayment * term;
  let totalInterest = totalCost - loan;

  // Monthly Totals
  let intPayment = loan * (intRate / 1200);
  // intPayment = Math.round((intPayment + Number.EPSILON) * 100) / 100;
  let principal = monthlyPayment - intPayment;
  // principal = Math.round((principal + Number.EPSILON) * 100) / 100;
  let accumulatedInterest = 0;
  let remainingBal = loan - monthlyPayment;
  // remainingBal = Math.round((remainingBal + Number.EPSILON) * 100) / 100;

  // get the table body element from the page
  const tableBody = document.getElementById('results');
  // get the template row
  const templateRow = document.getElementById('resultTemplate');
  // clear table first
  tableBody.innerHTML = "";
  // append header row
  let tableHeaderRow = `
    <tr>
      <td>Month</td>
      <td>Payment</td>
      <td>Principal</td>
      <td>Interest</td>
      <td>Total Interest</td>
      <td>Balance</td>
    </tr>
  `;

  tableBody.innerHTML = tableHeaderRow;

  // loop: # of iterations = term (months), increment by one month each iteration
  // Month: 1; Payment: monthlyPayment; Principal: calculate intPayment, subtract that from monthlypayment; Interest: intPayment; Total Interest: += intPayment

  for(let i = 1; i <= term; i++){

    // import template element from app.html as a document fragment (essentially make a copy of it)
    // true includes the node's descendants
    let tableRow = document.importNode(templateRow.content, true);
    // grab the td elements to put into an array
    let rowCols = tableRow.querySelectorAll('td');

    // cell 1 - Month
    rowCols[0].textContent = i;
    // cell 2
    rowCols[1].textContent = monthlyPayment;
    // cell 3
    rowCols[2].textContent = principal;
    // cell 4
    rowCols[3].textContent = intPayment;
    // cell 5
    rowCols[4].textContent = (accumulatedInterest += intPayment);
    // cell 6
    rowCols[5].textContent = remainingBal;

    // add all the rows to the table
    tableBody.appendChild(tableRow);

    // update loan amount, intPayment, principal
    remainingBal -= principal;
    intPayment = remainingBal * (intRate / 1200);
    principal = monthlyPayment - intPayment;
  }

}