import React from 'react'
import NavBar from '../Navbar/NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <div className='container'>
      <NavBar/>

      <Outlet></Outlet>
      <Footer/>
      </div>
        
    </div>
  )
}
