import React from 'react'
import Loader from './Loader'
import GoogleCalendar from '../js/GoogleCalendar'

import '../css/login.css'

export default function Login(props) {
  const { loading } = props
  return (
    <section className="login">
      <h1>Quero Sala PK</h1>
      <h2>Faça login com sua conta da PlayKids para continuar <span role="img" aria-label="upside-down-smile">🙃</span></h2>

      <button className={ loading ? 'loading' : '' } onClick={ !loading ? GoogleCalendar.signIn : null }>
        Autorizar
        { loading && <Loader size="2rem" color="white"/> }
      </button>
    </section>
  )
}