function doGet(e) {
  var userEmail = Session.getActiveUser().getEmail();
  Logger.log(userEmail);
  var template = HtmlService.createTemplateFromFile('form');
  template.userEmail = userEmail;
  var type = e.parameter.type;
  template.sheetName = type;
  return template.evaluate().setTitle('Daily Pallet Report');

  var type = e.parameter.type;
  var location = document.getElementbyID('location');
  

  template.addEventListener('submit',submitter);
  function submitter(e){
    logger.log('submitted');
    e.preventDefault();

}

}

function getScriptURL(type) {
  Logger.log(ScriptApp.getService().getUrl());
  return ScriptApp.getService().getUrl() + '?type=' + type;
}


function processForm(location, lprpu, lproh, cheppu, chepoh, ipppu, ippoh) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var user = Session.getActiveUser().getEmail();
  sheet.appendRow([new Date(), user, location, lprpu, lproh, cheppu, chepoh, ipppu, ippoh]); // Append data to the sheet
}

function emailForm(location,lbrpu, lproh){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var user = Session.getActiveUser().getEmail();
  var htmlBody = HtmlService.createTemplateFromFile('OpeningE');
  var contacts = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contacts");
  var emList = contacts.getRange(3, 2, 1, 2).getDisplayValues();
  var whsList = contacts.getRange(3, 2, 1, 1).getValues().join().split(',');
  Logger.log(whs);
  Logger.log(whsList);
  var whsIndex = whsList.indexOf(whs);
  var email_html = htmlBody.evaluate().getContent();
  var toEmail = emList[whsIndex][i + 1];


  MailApp.sendEmail({
            to: toEmail,
            subject: 'LPR' +" "+   'Opening Forecast for ' + Utilities.formatDate(new Date(), "PST", "dd/MM/yyyy") +" "+ 'Warehouse' +" "+ location 
    
})}

