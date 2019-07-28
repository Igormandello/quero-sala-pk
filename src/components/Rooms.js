import React, { Component } from 'react'
import Room from './Room'
import Loader from './Loader'
import GoogleCalendar from '../js/GoogleCalendar'
import FormattedDateDelta from '../js/FormattedDateDelta'
import roomsConfig from '../config/roomsConfig.json'

import '../css/rooms.css'

export default class Rooms extends Component {

  state = {
    rooms: [],
    loading: true,
    nextUpdate: null,
    timeRemaining: null
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
    setInterval(this.formatDate, 1000)
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
    this.setState({ loading: true, nextUpdate: next, timeRemaining: new FormattedDateDelta(now, next) })
  }

  parseCalendarResponse = (response) => {
    let roomResults = response.result.calendars
    let rooms = this.queryItems.sort((a, b) => a.name.localeCompare(b.name)).map(item =>
      <Room key={item.id} busy={roomResults[item.email].busy.length > 0} name={item.name}/>
    )

    this.setState({ rooms, loading: false })
  }

  formatDate = () => {
    this.setState({ timeRemaining: new FormattedDateDelta(new Date(), this.state.nextUpdate) })
  }

  render() {
    const { rooms, loading, timeRemaining } = this.state
    return (
      <section className="rooms">
        <div className="next-update">
          <h2>Tempo para a próxima atualização: { !loading ? timeRemaining.toString() : '' }</h2>
          { loading && <Loader color="white"/> }
        </div>
        <div className="rooms-grid">
          {rooms}
        </div>
      </section>
    )
  }
}