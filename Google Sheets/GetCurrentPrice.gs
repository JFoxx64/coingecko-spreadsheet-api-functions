/**
* Imports JSON Price Data from a single coin and market to your spreadsheet from Coin Gecko API
* @param coinname The name of the coin you wish to price
* @param market The Market you wish to compare with
* @param debug [optional] Used for testing to resolve issues - default: false 
* @customfunction
*/
function getCurrentPrice(coinname, market){
  
  try{
    //Strip string of capitilization and replace spaces with dashes to get ID
    var coinid = coinname.toLowerCase().replace(' ', '-');

    //Build URL using the coin id and market values
    var url = "https://api.coingecko.com/api/v3/simple/price?ids=" + coinid + "&vs_currencies=" + market

    //Make API Call and capture return value
    var res = UrlFetchApp.fetch(url);
    var content = res.getContentText();

    //Parse the string that is returned as JSON
    var json = JSON.parse(content);

    //Get the value of the coin using the id and market
    value = json[coinid][market];

    //Return the value to the cell that made the function call
    return value;
  }
  catch(err){
    Logger.log(err);
    return "ERROR: You probably didn't do anything wrong, but check the docs for some info on what could cause this: https://github.com/JFoxx64/coingecko-spreadsheet-api-functions/tree/main/Google%20Sheets"; 
  }
}

/**
* RefreshTickTrigger function for automatic refresh triggering in Google Sheets
* @customfunction
*/
function refreshTickTrigger(){
  try{
    var value = SpreadsheetApp.getActiveSheet().getRange('Z2').getValue();
    value = !value;

    SpreadsheetApp.getActiveSheet().getRange('Z2').setValue(value);
  }
  catch(err){
    Logger.log(err);
  }
}

/**
* Test function to debug GetCurrentPrice
* @param coinname The name of the coin you wish to price
* @param market The Market you wish to compare with
* @customfunction
*/
function testFunction() {
  Logger.log(getCurrentPrice("Shiba Inu", "usd"));
}
