import React from 'react'
import { NextSteps, LinkButtom, BtRadio } from './style'
import Song from '../../assets/img/song.svg'

function index(props) {
  return <NextSteps variant="contained" {...props}>{props.text}</NextSteps>
}

export function Link (props){
  return <LinkButtom variant="contained" {...props}>{props.text}</LinkButtom>
}

export function ButtonRadio (props){
  return <BtRadio variant="contained" {...props}><img alt="song" src={Song} /> {props.text}</BtRadio>
}

export default index

