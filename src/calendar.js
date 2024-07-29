var userEmail = properties['userEmail']

function getUserEmail() {
  Logger.log(userEmail)
  return userEmail
}

// to get calendar timezone (done)
function getTz() {
  var tz = encodeURIComponent(CalendarApp.getTimeZone())
  Logger.log(tz)
  return tz
}

function getCal() {
  var length = CalendarApp.getAllCalendars().length
  var final = createCalString(length)
  Logger.log(final)
  return final
}

function createCalString(numOfCals) {
  var calList = [];
  
  for (var i = 1; i <= numOfCals; i++) {
    var calId = getUserCalendar(i-1)
    var cal = "&src=" + calId;
    calList.push(cal);
  }

  // Concatenate all cal values into a single string
  var calendar = calList.join('');
  //Logger.log(calendar)
  return calendar;
}

function getUserCalendar(i) {
  var calendars = CalendarApp.getAllCalendars();

  calId = encodeURIComponent(calendars[i].getId())
  return calId
}

//-------------------------------------------------------------------------
function getTodaysDate() {
  var date = Utilities.formatDate(new Date(), "GMT+8", "MMMMMMMMM dd, yyyy")
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
  var event = CalendarApp.createCalendar('Develop Login Authentication').createEvent('Code Review',
    new Date(getTodaysDate()),
    new Date('August 13, 2024'));
  console.log('Event ID: ' + event.getId());
}