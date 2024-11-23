import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutesX(props) {

  if (localStorage.getItem("userToken")!= null) {
    return <Navigate to={'/home'}/>
  }
}
