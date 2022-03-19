// get values
function getValues() {

  let loanAmt = +(document.getElementById('loanAmt').value);
  let term = +(document.getElementById('term').value);
  let rate = +(document.getElementById('interestRate').value);

  calcResults(loanAmt, term, rate);
}

// calculate and display results
function calcResults(loan, term, intRate) {

  // Rounding - Format number to always show 2 decimal places
  // https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places

  // Totals
  let monthlyPayment = (loan * (intRate / 1200) / (1 - (1 + intRate / 1200) ** (-term)));
  let totalCost = monthlyPayment * term;
  let totalInterest = totalCost - loan;

  // Assign Totals
  // Total monthly payment
  document.getElementById('monthlyPayment').innerText = `$${(Math.round(monthlyPayment * 100) / 100).toFixed(2)}`;
  // Total principal
  document.getElementById('principal').innerText = `$${(Math.round(loan * 100) / 100).toFixed(2)}`;
  // Total interest
  document.getElementById('interest').innerText = `$${(Math.round(totalInterest * 100) / 100).toFixed(2)}`;
  // Total cost
  document.getElementById('cost').innerText = `$${(Math.round(totalCost * 100) / 100).toFixed(2)}`;

  // Monthly Totals
  let intPayment = loan * (intRate / 1200);
  let principal = monthlyPayment - intPayment;
  let remainingBal = loan - principal;
  let accumulatedInterest = 0;

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

  for(let i = 1; i <= term; i++){

    // import template element from app.html (true includes the node's descendants)
    let tableRow = document.importNode(templateRow.content, true);
    // grab the td elements to put into an array
    let rowCols = tableRow.querySelectorAll('td');

    // cell 1 - Month
    rowCols[0].textContent = i;
    // cell 2 - Monthly Payment
    rowCols[1].textContent = `$${(Math.round(monthlyPayment * 100) / 100).toFixed(2)}`;
    // cell 3 - Principal
    rowCols[2].textContent = `$${(Math.round(principal * 100) / 100).toFixed(2)}`;
    // cell 4 - Interest
    rowCols[3].textContent = `$${(Math.round(intPayment * 100) / 100).toFixed(2)}`;
    // cell 5 - Total Interest
    rowCols[4].textContent = `$${(Math.round((accumulatedInterest += +intPayment) * 100) / 100).toFixed(2)}`;
    // cell 6 - Balance
    rowCols[5].textContent = `$${(Math.round(remainingBal * 100) / 100).toFixed(2)}`;

    // add all the rows to the table
    tableBody.appendChild(tableRow);

    // update loan amount, intPayment, principal
    intPayment = remainingBal * (intRate / 1200);
    principal = monthlyPayment - intPayment;
    remainingBal -= principal;

  }

}