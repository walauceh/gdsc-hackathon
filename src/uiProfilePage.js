// Client ID and API key from the Developer Console
var CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
var API_KEY = 'YOUR_API_KEY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('login-button');
var calendarContainer = document.getElementById('calendar-container');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        if (events.length > 0) {
            var iframe = document.createElement('iframe');
            var email = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
            iframe.src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(email)}&ctz=Asia/Kuching`;
            iframe.width = '800';
            iframe.height = '600';
            iframe.frameborder = '0';
            iframe.scrolling = 'no';
            calendarContainer.appendChild(iframe);
        } else {
            calendarContainer.innerHTML = 'No upcoming events found.';
        }
    });
}

// Load the Google API client library
handleClientLoad();
