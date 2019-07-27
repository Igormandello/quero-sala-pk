let loginSection = document.getElementById('login')
let signInBtn = document.getElementById('signIn')

function setupCalendar() {
  signInBtn.classList.add('loading')
  GoogleCalendar.loadClient(signInStatusChanged, clientLoaded)
}

function signInStatusChanged(isLogged) {
  if (isLogged) {
    signInBtn.classList.remove('active')
    loginSection.classList.remove('active')
    
    gapi.client.directory.resources.calendars.list({ customer: 'my_customer' })
      .then(resources => {
        console.log(resources)
        
        gapi.client.calendar.freebusy.query({
          resource: {
            timeMin: "2019-07-27T00:00:00Z",
            timeMax: "2019-07-28T00:00:00Z",
            items: [ { id: 'br.movile.com_2d313231333237382d343735@resource.calendar.google.com' } ],
            timeZone: 'UTC'
          }
        }).then((response) => {
          console.log("Response", response);
        })
      })
  }
}

function clientLoaded() {
  signInBtn.onclick = GoogleCalendar.signIn
  signInBtn.classList.remove('loading')
}