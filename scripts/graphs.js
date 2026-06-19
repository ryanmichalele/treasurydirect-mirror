//This file will be ONLY for the functions used in multiple places, all data entry and graph creation will be done in a specific file to reduce load times
//SPLITGAS is now in scripts/public-debt-reports/splitgas.js
//SLGS are now in scripts/slgs/slgs-prin.js and scripts/slgs/slgs-securities.js
//All other graphs are in the scripts/example-chart-data folder


/*
    Helper Functions
*/

function formatCurrency(num, limit) {
    return '$' + Math.round(num).toString().substr(0, limit).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * @param num The numbers to round (array)
 * @param precision The number of decimal places to preserve
 */
function roundUp(num, precision) {
    var ans = [];
    for (let i = 0; i < num.length; i++) {
        ans[i] = num[i].toFixed(precision);
    }
    return ans;
}

function debtLimitRounder(num) {
    let debtNum = (num / 10000000);
    return parseInt(debtNum.toFixed()) / 100;
}

/*Example: roundUp([192.168], 1) //=> [192.2] */