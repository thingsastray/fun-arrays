var dataset = require('./dataset.json');

var bankBalances = dataset.bankBalances.map(function (balance){
  return {
    amount: balance.amount,
    state: balance.state
  };
});

function roundTo (amount, state){
  var result = parseFloat(amount);
  result = result.toFixed(state);
  result = parseFloat(result);
  return result; //result needs to be a number
}

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = bankBalances.filter(function (balance){
  return parseInt(balance.amount) > 100000;
});
/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example 
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = bankBalances.map(function (balance){
  return {
    amount: balance.amount,
    state: balance.state,
    rounded: Math.round(balance.amount)
  };
});

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example 
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = bankBalances.map(function (balance){
  return {
    amount: roundTo(balance.amount, 1),
    state: balance.state
  };
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = bankBalances.reduce(function (sum, newBalance) {
  var result = sum + roundTo(newBalance.amount, 2);
  return roundTo(result, 2); 
}, 0);

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = bankBalances.filter(function (balance){
  var selectStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
  return (selectStates.indexOf(balance.state) > -1);
})
.reduce(function (prev, curr){
  var newAmount = roundTo(curr.amount * 0.189, 2);
  return roundTo(prev + newAmount, 2); 
}, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = bankBalances.reduce(function (prevAccount, currAccount){
  
  if (!prevAccount.hasOwnProperty(currAccount.state)) {
    prevAccount [currAccount.state] = 0;
  }
  prevAccount[currAccount.state] += parseFloat(currAccount.amount);
  prevAccount[currAccount.state] = Math.round(prevAccount[currAccount.state]*100)/100;
  return prevAccount;
}, {});


/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = Object.keys(stateSums).filter(function (balance){
  var selectStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
  return (selectStates.indexOf(balance) <= -1);
})
.map(function(stateKey){
  return{
    state: stateKey,
    interest: Math.round(stateSums[stateKey] * 0.189 * 100)/100
  };
})
.filter(function(balance){
  return balance.interest > 50000;
})
 .reduce(function (prev, curr){
    return roundTo(prev + curr.interest, 2);
 }, 0);

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state 
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of 
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};