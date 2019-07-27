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
    let queryItems = 
      Object.keys(roomsConfig.rooms)
        .map(item => ({ id: item, email: roomsConfig.emailPrefix + item + roomsConfig.emailSufix }))
    
    GoogleCalendar.queryResources(
      queryItems.map(item => ({ id: item.email })),
      '2019-07-28T00:00:00Z',
      '2019-07-29T00:00:00Z'
    ).then(response => {
      let roomResults = response.result.calendars
      let rooms = queryItems.map(item =>
        <Room busy={roomResults[item.email].busy.length > 0} name={roomsConfig.rooms[item.id]}/>
      )

      this.setState({ rooms })
    })
  }

  render = () => (
    <section className="rooms-grid">
      {this.state.rooms}
    </section>
  )
}