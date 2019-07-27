import React, { Component } from 'react'
import Login from './components/Login'
import RoomsGrid from './components/RoomsGrid'

import GoogleCalendar from './js/GoogleCalendar'
import './css/style.css'

class App extends Component {

  state = {
    isLoading: true,
    isLogged: false
  }

  componentDidMount() {
    GoogleCalendar.loadClient(isLogged => this.setState({ isLogged }), () => this.setState({ isLoading: false }))
  }

  render = () => (
    <div className="app">
      { !this.state.isLogged && <Login loading={this.state.isLoading} /> }
      { this.state.isLogged && <RoomsGrid/>}
    </div>
  )
}

export default App