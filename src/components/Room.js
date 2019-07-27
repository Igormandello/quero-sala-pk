import React from 'react';
import '../css/room.css';

import check from '../assets/check.svg'
import cross from '../assets/cross.svg'

export default function Room(props) {
  let imageSrc, imageAlt
  if (props.busy) {
    imageSrc = cross
    imageAlt = 'Room is busy'
  } else {
    imageSrc = check
    imageAlt = 'Room is free'
  }

  return (
    <div className="room">
      <div className="state">
        <img alt={ imageAlt } src={ imageSrc }/>
      </div>
      <div>{ props.name }</div>
    </div>
  )
}