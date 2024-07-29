var CLIENT_ID = properties['CALENDAR_CLIENT_ID'];
var CLIENT_SECRET = properties['CALENDAR_CLIENT_SECRET'];
var Scopes = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.readonly'

/**
 * Authorizes and makes a request to the Google Drive API.
 */
function authorize() {
  var service = getService();
  if (service.hasAccess()) {
    Logger.log('Already authorized');
    return "Already authorized";
  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Authorization URL: ' + authorizationUrl);
    return authorizationUrl;  // Added return statement
  }
}

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  getService().reset();
}

/**
 * Configures the service.
 */
function getService() {
  return OAuth2.createService('Google')
      // Set the endpoint URLs.
      .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/v2/auth')
      .setTokenUrl('https://oauth2.googleapis.com/token')

      // Set the client ID and secret.
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)

      // Set the name of the callback function that should be invoked to
      // complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scope and additional Google-specific parameters.
      .setScope(Scopes)
      .setParam('access_type', 'offline')
      .setParam('prompt', 'consent')
      .setParam('login_hint', Session.getActiveUser().getEmail());
}

/**
 * Handles the OAuth callback.
 */
function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    // Successful login, handle access token
    Logger.log('User authorized');
    // Redirect or display success message
  } else {
    // Handle login failure
    Logger.log('Login failed');
    // Display error message
  }

  // Return HTML content to signal that the authorization process is complete
  return HtmlService.createHtmlOutputFromFile("closeLoginWindow");
}

/**
 * Logs the redict URI to register in the Google Developers Console.
 */
function logRedirectUri() {
  Logger.log(OAuth2.getRedirectUri());
}

function logout() {
  var service = getService()
  service.reset();
}

//---------------------------------------------
function getUserDetails() {
  var userInfo = Drive.About.get({fields: 'user'})
  Logger.log(userInfo)
  return userInfo
}

function test() {
  var userInfo = getUserDetails().user
  var name = userInfo.displayName
  var email = userInfo.emailAddress
  var profilePic = userInfo.photoLink

  Logger.log("Name: " + name)
  Logger.log("Email: " + email)
  Logger.log("Photo: " + profilePic)

  PropertiesService.getScriptProperties().setProperty('userEmail', email)
}



