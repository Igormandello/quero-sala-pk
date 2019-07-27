let signInBtn = document.getElementById('signIn');
let signOutBtn = document.getElementById('signOut');

function setupCalendar() {
  signInBtn.onclick = GoogleCalendar.signIn
  signOutBtn.onclick = GoogleCalendar.signOut
  GoogleCalendar.loadClient(signInStatusChanged)
}

function signInStatusChanged(isLogged) {
  if (isLogged) {
    signInBtn.style.display = 'none'
    signOutBtn.style.display = 'block'
  } else {
    signInBtn.style.display = 'block'
    signOutBtn.style.display = 'none'
  }
}