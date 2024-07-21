function doGet() {
    return HtmlService.createHtmlOutputFromFile('uiMain');
}

function getTodaysDate() {
  var date = Utilities.formatDate(new Date(), "GMT+8", "dd/MM/yyyy")
  Logger.log(date)
  return date
}

function getTodaysDateTime() {
  var date = Utilities.formatDate(new Date(), "GMT+8", "MMMMMMMMM dd, yyyy HH:mm:ss")
  Logger.log(date)
  return date
}

function createEvent(){
  // Creates an event in the script project's time zone and logs the ID
  var event = CalendarApp.getDefaultCalendar().createEvent('New test event',
    new Date(getTodaysDateTime()),
    new Date('July 23, 2024 18:00:00'));
  console.log('Event ID: ' + event.getId());
}
