# CoinGecko API Calls | Google Sheets

## The Easy Setup | Get Current Price

### Find your coin on CoinGecko

Select a crypto currency that you would like to get the current price from [CoinGecko] (https://www.coingecko.com/) and get the coin id from the coin's url as shown below:

![coinid](https://user-images.githubusercontent.com/13318642/119428055-34396080-bcda-11eb-87f5-b9e546f05fb3.PNG)

### Create a Google Apps Project

Once you have one selected, head to Google Sheets and open up the spreadsheet you would like to work on.  For this to work, we're going to need to add a Project and allow that project (which is private and yours alone unless you share it) some permissions.  On the spreadsheet that you would like to use, go to the toolbar and click on Tools, then select Script Editor.

You're going to copy all of the GetCurrentPrice.gs file and paste it into the code field, then rename the file to GetCurrentPrice.  After you do this, at the top you'll see a Run button, then a Debug button, and finally a dropdown.  Click on the dropdown and select refreshTickTrigger - then click Run.

This process takes a little but, but eventually it will pop up with a message with the header Authorization required:

![authrequired](https://user-images.githubusercontent.com/13318642/119428791-92b30e80-bcdb-11eb-9361-8b73bfb7e63b.png)

Click Review Permissions and then select your account.  The next message is pretty scary:

![warningmessage](https://user-images.githubusercontent.com/13318642/119428966-e160a880-bcdb-11eb-8ee1-363186ff1ad6.PNG)

This just means that Google hasn't verified the App, which is fine because this is an App that is for your personal use, not for Google.  And you are the "developer".  Click on the Advanced on the left that is underlined and then click on the Go to Untitled project (unsafe) at the bottom - Or if you renamed the project, whatever the name it was that you called it.

This is a good warning, and I would typically not recommend you ignore this - Especially if you are using someone elses project.  But because this will be your own personal project, it's completely safe (as long as you don't share it with anyone else).

After this, it will ask you for two permissions:

![permissions](https://user-images.githubusercontent.com/13318642/119429310-998e5100-bcdc-11eb-9f58-e1430998a2c0.png)

Click Allow.  Once you are back to the code screen again, go to the dropdown menu at the top next to Debug and select testFunction then click Run again.  You should get the current price of Shiba Inu coins in USD ($SHIBArmy).

Now the hard part is out of the way!

### Creating The Spreadsheet

I'm sure you have a whole spreadsheet plan already laid out and you're just looking to plop in a number.  To do that is simple!  Take the coin ID that you found at the start and the market you want to compare it to (A whole list is available on CoinGecko's API page in the simple section near the bottom: [CoinGecko API] (https://www.coingecko.com/api)).  For this example we are going to use Shiba and usd.

The formula is simple:

=getCurrentPrice("shiba-inu", "usd", $Z$2)

You may be wondering what that little bit at the end is?  Well, that's a cell refrence to a checkbox you haven't inserted yet.  Head on over to Z2 and use Insert -> Check Box.  It doesn't *need* to be inserted there, but that makes it simplier than updating all of the references to that cell later.

With that done, you should now have a cell that updates with the current price every time you click on that check box.  But we can do better!

### Automatic Price Updating

For this, we are going to need to go back to Tools -> Script Editor.  On the far left hand side there is an icon that looks like a clock and when you hover over it you'll see the name Triggers.  Click on that.  In this new screen, down on the bottom right is a big blue button that says Add Trigger, and select that.

Choose which function to run should be refreshTickTrigger.
Select event source should be Time-driven
Select type of time based trigger should be - well, whatever you like.  I choose minutes timer
Select an interval that you would like.  Just remember that you only get 100 calls per minute and that they are not always successful.  I choose Every Minute.

![triggersetup](https://user-images.githubusercontent.com/13318642/119431101-fd664900-bcdf-11eb-891a-53d9186f33b1.png)

With that all setup, and assuming that you didn't change where the check box was (Z2), hit Save and you are done.  Every interval the project will run your timer and update your prices.

If you did change where the refresh check box was (or never inserted it) you can insert it wherever, just make sure that the code inside the refreshTickTrigger points to the correct cell and that your cells third parameter is properly set to the check box to force revalidation.

### Refresh Button

For some additional ease of use if you would like to refresh you can always copy the RefreshButton.gs code into another file.  When you load the page, it will create a new button at the top that will force a fresh refresh of prices.

## ERRORS!

There are errors that we can control (Making sure the right coin id is typed and that the market is valid) and there are errors that we can't control (occassionally prices failing to update from the API for reasons that aren't documented).

### Troubleshooting

* First off, make sure that the permissions were given to the App.  If they were not, than the function will not work.
* Next, make sure that you use the coin ID (as shown above).  The code tries to make it work if you use the coin name but that isn't always going to work.  It's much safer to use the ID.
* Make sure that the market you select is a valid selection, below is a list of acceptable markets:
  "btc",
  "eth",
  "ltc",
  "bch",
  "bnb",
  "eos",
  "xrp",
  "xlm",
  "link",
  "dot",
  "yfi",
  "usd",
  "aed",
  "ars",
  "aud",
  "bdt",
  "bhd",
  "bmd",
  "brl",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "eur",
  "gbp",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "vef",
  "vnd",
  "zar",
  "xdr",
  "xag",
  "xau",
  "bits",
  "sats"
* Make sure that you are not calling the API more than 100 times in a minute.  If you have not changed any of the code and you selected anything from a minute or higher in the trigger interval, you should be fine.

If your problem isn't resolved and you are doing all of that, then try refreshing again in a minute.  Or refresh a few times.  Sometimes it fails and throws an error number that I have no idea what it means or what is causing it.  Try, try again.
