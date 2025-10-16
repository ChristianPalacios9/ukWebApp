function doGet(e) {
  var userEmail = Session.getActiveUser().getEmail();
  Logger.log(userEmail);
  var template = HtmlService.createTemplateFromFile('form');
  template.userEmail = userEmail;
  var type = e.parameter.type;
  template.sheetName = type;
  return template.evaluate().setTitle('Daily Pallet Report');
}

function getScriptURL(type) {
  Logger.log(ScriptApp.getService().getUrl());
  return ScriptApp.getService().getUrl() + '?type=' + type;
}

function getDropdownOptions() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Contacts'); // Replace 'Sheet1' with your sheet name
  var range = sheet.getRange('B3:B31'); // Adjust 'A:A' to your column
  var values = range.getValues();
  var options = values.flat().filter(String); // Flatten array and remove empty strings
  return options;
    }

function processForm(location, lprpu, lproh, cheppu, chepoh, ipppu, ippoh) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var user = Session.getActiveUser().getEmail();
  var date = new Date();
  var ukTimeZone = "Europe/London";  
  var timezone = Session.getScriptTimeZone();
  var dateFormat = "dd/MM/yyyy HH:mm:ss";
  var now = Utilities.formatDate(date,ukTimeZone,dateFormat);
  Logger.log(now); 
  sheet.appendRow([now, user, location, lprpu, lproh, cheppu, chepoh, ipppu, ippoh]); // Append data to the sheet.

  var mainsheet = SpreadsheetApp.openById('1bj2MUdWIbYJ1fWTZ6DTnyHYqnBk1iPM33aVS3Ludz0s').getSheetByName("App");


  var htmlBody = HtmlService.createTemplateFromFile('OpeningE');  
  var contacts = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contacts");
  var emList = contacts.getRange(3, 2, 29, 2).getDisplayValues();
  var whsList = contacts.getRange(3, 2, 29, 1).getValues().join().split(',');
   Logger.log(location);
   Logger.log(whsList);

  var location = location;
  var whsIndex = whsList.indexOf(location);
   Logger.log(whsIndex);
   Logger.log(emList);
   // Email list

   // set the values for the placeholders
    htmlBody.Warehouse = location;
    htmlBody.Pickup = lprpu;
    htmlBody.Onhand =  lproh;
  
          // evaluate and get the html
   var email_html = htmlBody.evaluate().getContent();
   var toEmail = emList[whsIndex][1];
   

       // Send the email
       MailApp.sendEmail({
        to: toEmail,
        subject: 'LPR' +" "+   'Opening Forecast for ' + Utilities.formatDate(new Date(), "PST", "dd/MM/yyyy") +" "+ 'Warehouse' +"  "+ location,
        htmlBody: email_html,            

       });
}

