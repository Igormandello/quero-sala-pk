import React from 'react';
import '../css/room.css';

import check from '../assets/check.svg'
import cross from '../assets/cross.svg'

export default function Room(props) {
  return (
    <div className="room">
      <div className="state">
        <img src={ props.busy ? cross : check }/>
      </div>
      <div>{ props.name }</div>
    </div>
  )
}