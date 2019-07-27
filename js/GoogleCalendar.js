const config = {
  clientId: '1005220868008-6124m941hpft1cjmrpco4vm82s38gvup.apps.googleusercontent.com',
  apiKey: 'AIzaSyDepoimIlEJvYILk65TumQ4elm3EbBAHIA',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  scopes: 'https://www.googleapis.com/auth/calendar.readonly'
}

class GoogleCalendar {
  static loadClient(signInStatusChanged) {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: config.apiKey,
        clientId: config.clientId,
        discoveryDocs: config.discoveryDocs,
        scope: config.scopes
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(signInStatusChanged)
        signInStatusChanged(gapi.auth2.getAuthInstance().isSignedIn.get())
      })
    })
  }

  static signIn(event) {
    gapi.auth2.getAuthInstance().signIn()
  }

  static signOut(event) {
    gapi.auth2.getAuthInstance().signOut()
  }
}