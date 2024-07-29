function doGet() {
    return HtmlService.createHtmlOutputFromFile('uiDashBoard')
      .setTitle('Your Website Title')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getPage(page) {
  return HtmlService.createHtmlOutputFromFile(page).getContent()
}

function extractData() {
  var sheetId = '1GfzgoWtCCgKEtB_9CoID9vczb5G2VAuX7Cqmu8fbreQ'; // Replace with your actual Sheet ID
  var spreadsheet = SpreadsheetApp.openById(sheetId);
  var sheet = spreadsheet.getSheetByName("Employee Data"); // Replace "Sheet1" with your sheet name

  var data = sheet.getDataRange().getValues();
  var userEmail = Session.getActiveUser().getEmail(); // Get logged-in user’s email
  
  Logger.log('Logged-in user email: ' + userEmail); // Log user email
  Logger.log('hi  ')
  for (var i = 1; i < data.length; i++) {
    var employeeName = data[i][0];
    var employeeEmail = data[i][1];
    var employeePosition = data[i][2];
    var employeeImageLink = data[i][3];
    
    Logger.log('Checking email: ' + employeeEmail); // Log each email in the sheet

    if (employeeEmail.trim() === userEmail.trim()) {
      Logger.log('User found: ' + JSON.stringify({ name: employeeName, email: employeeEmail, position: employeePosition, imageLink: employeeImageLink }));
      return {
        name: employeeName,
        email: employeeEmail,
        position: employeePosition,
        imageLink: employeeImageLink
      };
    }
  }
  return null;
}
