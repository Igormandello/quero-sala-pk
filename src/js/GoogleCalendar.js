import config from '../config.json'

export default class GoogleCalendar {
  static loadClient(signInStatusChanged, clientLoaded) {
    GoogleCalendar.gapi = window.gapi
    GoogleCalendar.gapi.load('client:auth2', () => {
      GoogleCalendar.gapi.client.init({
        apiKey: config.apiKey,
        clientId: config.clientId,
        discoveryDocs: config.discoveryDocs,
        scope: config.scope
      }).then(() => {
        GoogleCalendar.gapi.auth2.getAuthInstance().isSignedIn.listen(signInStatusChanged)
        signInStatusChanged(GoogleCalendar.gapi.auth2.getAuthInstance().isSignedIn.get())

        clientLoaded()
      })
    })
  }

  static signIn() {
    GoogleCalendar.gapi.auth2.getAuthInstance().signIn()
  }

  static doTheTrick() {
    GoogleCalendar.gapi.client.calendar.freebusy.query({
      resource: {
        timeMin: "2019-07-27T00:00:00Z",
        timeMax: "2019-07-28T00:00:00Z",
        items: [ { id: 'br.movile.com_2d313231333237382d343735@resource.calendar.google.com' } ],
        timeZone: 'UTC'
      }
    }).then((response) => {
      console.log("Response", response);
    })
  }
}