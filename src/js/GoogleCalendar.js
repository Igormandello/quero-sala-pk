import authConfig from '../config/authConfig.json'

export default class GoogleCalendar {
  static loadClient(signInStatusChanged, clientLoaded) {
    GoogleCalendar.gapi = window.gapi
    GoogleCalendar.gapi.load('client:auth2', () => {
      GoogleCalendar.gapi.client.init(authConfig).then(() => {
        GoogleCalendar.gapi.auth2.getAuthInstance().isSignedIn.listen(signInStatusChanged)
        signInStatusChanged(GoogleCalendar.gapi.auth2.getAuthInstance().isSignedIn.get())

        clientLoaded()
      })
    })
  }

  static signIn() {
    GoogleCalendar.gapi.auth2.getAuthInstance().signIn()
  }

  static queryResources(items, timeMin, timeMax) {
    return GoogleCalendar.gapi.client.calendar.freebusy.query({
      resource: {
        timeMin,
        timeMax,
        items,
        timeZone: 'GMT-03',
        calendarExpansionMax: 50
      }
    })
  }
}