import React from 'react'
import NavBar from '../Navbar/NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <div className='containereee'>
      
        <div className='navbar'>
        <NavBar/>
        </div>
        <div className='content'>
        <Outlet></Outlet>
        </div>
        <div className='footer'>
        
          <Footer/>
        </div>

      
      </div>
        
    </div>
  )
}
