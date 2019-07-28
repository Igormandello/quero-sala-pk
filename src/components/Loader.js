import React from 'react'
import '../css/loader.css'

export default function Loader(props) {
  const { size, color } = props
  return (
    <div className="loader">
      <svg className="circular" viewBox="25 25 50 50" style={{ width: size, height: size }}>
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" stroke={ color }/>
      </svg>
    </div>
  )
}