import React, { Component } from 'react'
import Room from '../components/Room'
import GoogleCalendar from '../js/GoogleCalendar'
import roomsConfig from '../config/roomsConfig.json'

import '../css/rooms-grid.css'

export default class RoomsGrid extends Component {

  state = {
    rooms: []
  }

  componentDidMount() {
    this.queryItems = 
      Object.entries(roomsConfig.rooms)
        .map(entry => ({ 
          id: entry[0],
          name: entry[1],
          email: roomsConfig.emailPrefix + entry[0] + roomsConfig.emailSufix
        }))

    this.fetchRooms()
  }

  fetchRooms = () => {
    let now = new Date()
    let previous = new Date()
    let next = new Date()

    if (now.getMinutes() >= 30) {
      previous.setMinutes(30, 0)
      next.setHours(now.getHours() + 1, 0, 0)
    } else {
      previous.setMinutes(0, 0)
      next.setMinutes(30, 0)
    }

    GoogleCalendar.queryResources(
      this.queryItems.map(item => ({ id: item.email })),
      previous.toJSON(),
      next.toJSON()
    ).then(this.parseCalendarResponse)

    setTimeout(this.fetchRooms, next - now + 1000)
  }

  parseCalendarResponse = (response) => {
    let roomResults = response.result.calendars
    let rooms = this.queryItems.sort((a, b) => a.name.localeCompare(b.name)).map(item =>
      <Room key={item.id} busy={roomResults[item.email].busy.length > 0} name={item.name}/>
    )

    this.setState({ rooms })
  }

  render = () => (
    <section className="rooms-grid">
      {this.state.rooms}
    </section>
  )
}