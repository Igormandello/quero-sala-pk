import React, { Component } from 'react'
import Login from './components/Login'
import GoogleCalendar from './js/GoogleCalendar'
import './css/style.css'

class App extends Component {

  state = {
    isLoading: true,
    isLogged: false
  }

  componentDidMount() {
    GoogleCalendar.loadClient(this.signInStatusChanged, () => this.setState({ isLoading: false }))
  }

  signInStatusChanged = (isLogged) => {
    if (isLogged) {
      this.setState({ isLogged: true })
      GoogleCalendar.doTheTrick()
    }
  }

  render = () => (
    <div className="app">
      { !this.state.isLogged && <Login loading={this.state.isLoading} /> }
    </div>
  )
}

export default App