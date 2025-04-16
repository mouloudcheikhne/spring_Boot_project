import React from 'react'
import {Link} from 'react-router-dom'
import './nav.css';
import { IoMdNotifications } from "react-icons/io";
export default function NavBar() {
    
  return (
    
        <nav className='navbar_user'>
            <div className='partie1'>
                <Link to={""} className='logo'>
                Home
                </Link>
                
                <div>
                <Link to={"/service"} className='items'>
                Service
                </Link>
                <Link to={"/service"} className='items'>
                My complains
                </Link>
              
    
                </div>
            </div>
            <div className="partie2"> 
            <ul>
                <li>
                    <Link to={'/search'} >
                    <i className='bi bi-search icon_width'></i>
                    </Link>
                </li>
                <li>
                    <Link to={'/notification'} >
                    <i className='bi bi-bell-fill icon_width'></i>
                    </Link>
                </li>
                <li>
                    <Link to={'/profile'} >
                    <i className='bi bi-person-circle icon_width'></i>
                    </Link>
                </li>
                <li>
                    <Link to={'/login'} >
                    <button>login</button>
                    </Link>
                </li>
               
             
            </ul>
           
                    
                    
                    
            </div>
          
        </nav>
  
  )
}
