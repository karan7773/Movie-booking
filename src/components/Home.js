import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'

export default function Home() {
  return (
    <div className='container'>
        <h1 className='home_heading'>Home</h1>
        <p>Login to continue</p>
        <div className='home_btns'>
          <button className='btn'><Link to="login" style={{textDecoration: 'none'}}>Login</Link></button>
        </div>
    </div>
  )
}
