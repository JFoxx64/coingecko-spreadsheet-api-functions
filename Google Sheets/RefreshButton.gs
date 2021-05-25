function onOpen() { 
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu("Refresh CoinGecko Prices")
    .addItem("Refresh","refreshTickTrigger")
    .addToUi();
}